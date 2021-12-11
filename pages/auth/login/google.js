import { useRouter } from 'next/router'
import { useEffect } from 'react'
import apiAuth from '../../api/auth'
import { loginGoogle } from '../../../action/auth/authAction'
import { connect, useDispatch } from "react-redux";

function Google (){
  const router = useRouter()
  const path = router.asPath.replace('/auth/login/google','')
  console.log(path)
  useEffect(async() => {
    loginGoogle(path)
    // await apiAuth.callbackGoogle(path)
    //   .then(() => {
    //     window.location.href = '/dashboard'
    //   })
  }, [])

  console.log(path)
  return(
      <div className="text-center mt-12">
        Loading ...
      </div>
  )
}

export default connect(loginGoogle)(Google);