import { useRouter } from 'next/router'
import { useEffect } from 'react'
import apiAuth from '../../api/auth'
import { loginGoogle } from '../../../action/auth/authAction'
import { connect, useDispatch } from "react-redux";

function Google (props){
  console.log(props)
  const router = useRouter()
  const path = router.asPath.replace('/auth/login/google','')
  console.log(path)
  useEffect(async() => {
    props.loginGoogle(path)
  }, [])

  console.log(path)
  return(
      <div className="text-center mt-12">
        Loading ...
      </div>
  )
}

const mapStateToProps = (state) => ({
  auth: '',
});

export default connect(mapStateToProps, {loginGoogle})(Google);