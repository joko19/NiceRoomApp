import { useRouter } from 'next/router'
import { useEffect } from 'react'
import apiAuth from '../../api/auth'

function Facebook (){
  const router = useRouter()
  const path = router.asPath.replace('/auth/login','')
  console.log(path)
  useEffect(async() => {
    await apiAuth.callbackFacebook(path)
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

export default Facebook