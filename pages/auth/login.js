import { useRouter } from 'next/router'
import { useEffect } from 'react'
import apiAuth from '../api/auth'

function Login (){
  const router = useRouter()
  // console.log(router)
  // console.log(router.asPath)
  const path = router.asPath.replace('/auth/login','')
  console.log(path)
  useEffect(async() => {
    await apiAuth.callbackGoogle(path)
      .then(() => {
        window.location.href = '/dashboard'
      })
  }, [])

  console.log(path)
  return(
      <div className="text-center mt-12">
        Loading ...
      </div>
  )
}

export default Login