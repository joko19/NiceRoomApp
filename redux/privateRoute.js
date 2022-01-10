import { useRouter } from "next/router";
import role from "./role";
import { store } from "./store";

function redirect() {
  const router = useRouter()
  router.replace('/')
  return null
}

const privateRoute = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();
      const isAuth = store.getState().auth.isAuthenticated
      console.log()
      if (isAuth) {
        const roleUser = store.getState().auth.user.user.roles[0].name
        if (router.pathname.startsWith("/admin") && roleUser !== role.admin)
          redirect()
        else if (router.pathname.startsWith("/institute") && roleUser !== role.instituteAdmin)
          redirect()
        else if (router.pathname.startsWith("/operator") && roleUser !== role.operator)
          redirect()
        else if (router.pathname.startsWith("/staff") && roleUser !== role.staff)
          redirect()
        else if (router.pathname.startsWith("/student") && roleUser !== role.student)
          redirect()
        else
          return <WrappedComponent {...props} />;
      } else {
        redirect()
      }
    }

    // If we are on server, return null
    return null;
  };
};


export default privateRoute