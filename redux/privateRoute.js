import { useRouter } from "next/router";
import * as jwt from 'jsonwebtoken'
import { useDispatch } from "react-redux";
import { reSetCurrentUser } from "../action/auth/authAction";
import apiAuth from "../pages/api/auth";

const admin = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const auth = props.auth

      if (!auth.isAuthenticated) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

const reseller = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const dispatch = useDispatch()
      const auth = props.auth

      // try request API
      apiMitra.balance()
        .then((res) => {
          const result = res.data
          if (result.statusCode == 401) {
            dispatch(reSetCurrentUser({}));
            localStorage.removeItem('ACCESS_TOKEN')
            Router.replace('/login')
          }
        })

      if (!auth.isAuthenticated) {
        Router.replace("/login");
        return null;
      }

      const accessToken = auth.user?.token

      if (!accessToken) {
        Router.replace("/login");
        return null;
      }

      var user = jwt.decode(accessToken)?.user

      if (!user) {
        Router.replace("/login");
        return null;
      }

      if (!user.roles.includes('reseller')) {
        Router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export { admin, reseller }