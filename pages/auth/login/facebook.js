import { useRouter } from 'next/router'
import { useEffect } from 'react'
import apiAuth from '../../api/auth'
import { loginFacebook } from '../../../action/auth/authAction'
import { connect, useDispatch } from "react-redux";

function Facebook(props) {
  const router = useRouter()
  const path = router.asPath.replace('/auth/login/facebook', '')
  console.log(props)
  console.log("hello world login with facebook")
  useEffect(async () => {
    // props.loginFacebook(path)
    // await apiAuth.callbackFacebook(path)
    //   .then(() => {
    //     window.location.href = '/dashboard'
    //   })
  }, [])

  console.log(path)
  return (
    <div className="text-center mt-12">
      Loading ...
    </div>
  )
}

export default connect(loginFacebook)(Facebook);
