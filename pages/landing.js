import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Footer from '../components/footer/footer'
import Header from '../components/Navbar/header';
import apiAuth from './api/auth'
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from '../action/auth/authAction'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { data } from 'autoprefixer';
import store from './../redux/store'

function Landing(props) {
  // const state = store.getState()
  const list = [1, 2, 3]
  const [passwdLogin, setPasswdLogin] = useState(true)
  const [passwdRegister, setPasswdRegister] = useState(true)
  const [confirm, setConfirm] = useState(true)
  const [formStatus, setFormStatus] = useState('login')
  const [infoReset, setInfoReset] = useState()
  const [errors, setErrors] = useState()
  const { register, handleSubmit, resetField, getValues } = useForm();

  const onRegister = async () => {
    const data = {
      name: getValues('name'),
      email: getValues('email'),
      phone: getValues('phone'),
      password: getValues('password'),
      password_confirmation: getValues('password_confirmation')
    }
    props.registerUser(data)
    setErrors(props.errors)
  }

  const onLogin = async () => {
    const data = {
      email: getValues('email'),
      password: getValues('password')
    }
    props.loginUser(data)
    setErrors(props.errors)
  }

  const onLoginGoogle = async () => {
    await apiAuth.loginGoogle()
      .then((res) => {
        console.log(res)
        window.location.href = res.data.data.url
      })
  }

  const onLoginFacebook = async () => {
    await apiAuth.loginFacebook()
      .then((res) => {
        window.location.href = res.data.data.url
      })
  }

  const onForgot = async () => {
    await apiAuth.forgotPassword({ email: getValues('email') })
      .then((res) => {
        setInfoReset(res.data.message)
      })
      .catch((err) => {
        setErrors(err.response.data)
      })
  }

  const onChangeForm = (to) => {
    resetField('name')
    resetField('phone')
    resetField('email')
    resetField('password')
    resetField('confirmation_password')
    setFormStatus(to)
  }

  return (
    <>
      <section className="banner full-height">
        <Header />
        <div className="grid md:grid-cols-2 ">
          <div className="pt-36 pl-36 hidden md:flex md:flex-col text-white">
            <h1 className="font-bold text-5xl">All-in-One Sites <br />
              for Preparation Exam</h1>
            <p className="mt-2">Makes preparation simplified with Examz</p>
          </div>
          {formStatus === 'login' && (
            <div className='my-40 bg-white rounded-lg p-6 m-4 md:m-24'>
              <form onSubmit={handleSubmit(onLogin)}>
                <h1 className="text-xl text-center">Welcome to Examz!</h1>
                <p className="text-black-3 text-center">Be ready for exam with us</p>
                <p className="mt-4">Email / Phone {errors && errors.data && (
                  <span className="text-red-1 text-sm">{errors.data.email}</span>
                )}</p>
                <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Email or Phone" {...register("email")} />
                <p className="mt-4">Password {errors && errors.data && (
                  <span className="text-red-1 text-sm">{errors.data.password}</span>
                )}</p>
                <div className="relative">
                  <input type={`${passwdLogin ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" {...register("password")} />
                  <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                    passwdLogin ? setPasswdLogin(false) : setPasswdLogin(true)
                  }}>
                    {passwdLogin ?
                      (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                      (<FaEye className=" z-10 inline-block align-middle" />)
                    }
                  </span>
                </div>
                <span className="text-right text-end mt-2 text-black-3 cursor-pointer hover:text-blue-1" onClick={() => {
                  setErrors(null)
                  setFormStatus('forgotPassword')
                }}>Forgot Password ?</span>
                {errors && errors.message === 'Unauthorized' && (
                  <p className="text-red-1 text-sm">Check your email or password</p>
                )}
                <button type="submit" className="w-full bg-yellow-1 text-white p-3 mt-4 rounded-xl" onClick={() => onLogin()}>Login</button>
              </form>
              <p className="text-center m-4 text-black-4">or continue with</p>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex w-full justify-center gap-4 border px-6 py-3 border-yellow-1 rounded-lg" onClick={() => onLoginFacebook()}><img src="/asset/icon/ic_facebook.png" alt="login with facebook" /> Facebook</button>
                <button className="flex w-full  gap-4 justify-center border px-6 py-3 border-yellow-1 rounded-lg" onClick={() => onLoginGoogle()}><img src="/asset/icon/ic_google.png" alt="login with google" /> Google</button>
              </div>
              <p className="text-right mt-2 text-black-3">Dont you have account ?  <button className='text-blue-1 font-bold' onClick={() => {
                onChangeForm('register')
                setErrors(null)
              }}>Register</button></p>
            </div>
          )}

          {formStatus === 'register' && (
            <form onSubmit={handleSubmit(onRegister)} className="my-40 bg-white rounded-lg m-4 p-4 md:m-24">
              <h1 className="text-xl text-center">Create Account</h1>
              <p className="text-black-3 text-center">create an account and get a lot of benefits</p>
              <p className="mt-4">Full Name {errors && errors.data && (
                <span className="text-red-1 text-sm">{errors.data.name}</span>
              )}</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Fullname"{...register("name")} />
              <p className="mt-4">Email {errors && errors.data && (
                <span className="text-red-1 text-sm">{errors.data.email}</span>
              )}</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Email" {...register("email")} />
              <p className="mt-4">Phone {errors && errors.data && (
                <span className="text-red-1 text-sm">{errors.data.phone}</span>
              )}</p>
              <input type="number" className="p-4 border rounded-xl w-full" placeholder="Input Your Phone Number"{...register("phone")} />
              <div className='flex gap-4'>
                <div className='w-full'>
                  <p className="mt-4">Password</p>
                  <div className="relative">
                    <input type={`${passwdRegister ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Input Your Password" {...register("password")} />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      passwdRegister ? setPasswdRegister(false) : setPasswdRegister(true)
                    }}>
                      {passwdRegister ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>
                </div>
                <div className='w-full'>
                  <p className="mt-4">Password Confirmation</p>
                  <div className="relative">
                    <input type={`${confirm ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Confirmation Password" {...register("password_confirmation")} />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      confirm ? setConfirm(false) : setConfirm(true)
                    }}>
                      {confirm ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>

                </div>
              </div>
              {errors && errors.data && (
                <p className="text-red-1 text-sm">{errors.data.password}</p>
              )}

              <button className="w-full bg-yellow-1 text-white p-2 mt-4 rounded-xl" >Register</button>
              <p className="text-right mt-2 text-black-1">Do you have account ? <button className='font-bold text-blue-1' onClick={() => {
                onChangeForm('login')
                setErrors(null)
              }}> Login </button></p>
            </form>
          )}

          {formStatus === 'forgotPassword' && (
            <form onSubmit={handleSubmit(onForgot)} className="my-40 bg-white rounded-lg p-4 md:mt-64  m-4 md:m-24">
              <h1 className="text-xl text-center">Forgot Password ?</h1>
              <p className="text-black-3 text-center">Enter your email or phone number to reset your password.</p>
              <p className="mt-4">Email {errors && (
                <span className="text-red-1 text-sm">{errors.message}</span>
              )}</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Email" {...register("email", { required: true })} />
              <p className="text-blue-1 text-xs">{infoReset}</p>
              <button className="w-full bg-yellow-1 text-white p-2 mt-4 rounded-xl">Submit</button>
              <p className="text-right mt-2 text-black-3 text-center">Remember Password ?
                <button className="text-blue-1" onClick={() => {
                  onChangeForm('login')
                  setErrors(null)
                }}>Login</button> or
                <button onClick={() => {
                  onChangeForm('register')
                  setErrors(null)
                }}>Register</button> </p>
            </form>
          )}
        </div>
      </section>

      <section className="grid xl:grid-cols-3 md:mx-16 my-20">
        <div className="m-2">
          <img src="/asset/icon/ic_question.png" />
          <h1 className="font-bold text-2xl mt-4">Top Quality Questions</h1>
          <p className="mt-4">All questions and solutions, designed by top exam experts, based on latest patterns and actual exam level</p>
        </div>

        <div className="m-2">
          <img src="/asset/icon/ic_live.png" />
          <h1 className="font-bold text-2xl mt-4">Live Tests for Real Experience</h1>
          <p className="mt-4">Get your All-India Rank and feel the thrill of a real-exam. Groom your pressure handling and time management skills.</p>
        </div>

        <div className="m-2">
          <img src="/asset/icon/ic_diagram.png" />
          <h1 className="font-bold text-2xl mt-4">Personalized, detailed Analysis</h1>
          <p className="mt-4">Know your weaknesses, strengths and everything else that you need to know to improve your score and rank.</p>
        </div>
      </section>

      <section className="bg-black-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 py-20 md:px-20 px-4">
        <div className="self-center mr-4">
          <h1 className="font-bold text-blue-1 text-3xl mb-4">Real number can be trusted</h1>
          <p className="text-black-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis scelerisque at quam congue posuere libero in sit quam. Consequat, scelerisque non tincidunt sit lectus senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis scelerisque at quam congue posuere libero in sit quam. Consequat, scelerisque non tincidunt sit lectus senectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid  md:grid-cols-1 lg:grid-cols-2 ">
          <div>
            <div className="bg-white m-5 p-5 rounded-lg h-40  filter drop-shadow-md">
              <img src="/asset/icon/ic_read.png" alt="icon" />
              <h1 className="mt-4">1,88,06,292+</h1>
              <p>Student registered in our platform</p>
            </div>
            <div className="bg-white m-5 p-5 rounded-lg h-40  filter drop-shadow-md">
              <img src="/asset/icon/ic_ball.png" alt="icon" />
              <h1 className="mt-4">14,54,74,962+</h1>
              <p>Quiz atempted by our student</p>
            </div>
          </div>

          <div>
            <div className="bg-white m-5 p-5 rounded-lg h-40 filter drop-shadow-md">
              <img src="/asset/icon/ic_a+.png" alt="icon" />
              <h1 className="mt-4">14,54,74,962+</h1>
              <p>Test atempted by our student</p>
            </div>
            <div className="bg-white m-5 p-5 rounded-lg h-40  filter drop-shadow-md">
              <img src="/asset/icon/ic_ask.png" alt="icon" />
              <h1 className="mt-4">59,88,26,242+</h1>
              <p>Question answered in our platform</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h1 className="text-2xl text-center font-bold text-blue-1 p-1">Real story from our student</h1>
        <p className="text-black-4 mt-4 text-center">Read and get inspired by stories from our happy student</p>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 md:px-20 mt-12">
          <div className=" filter drop-shadow-lg bg-white p-8 mx-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intega aliquam lectus risus ut vestibulum consequat comodo lorem. Risus, in eget tristique commodo lectus mattis et.</p>
            <div className="flex flex-row mt-4">
              <img src="/asset/icon/ava1.png" alt="photo profile" className="object-cover " />
              <div className="flex flex-col ml-4">
                <h1 className="font-bold align-center">John Doe</h1>
                <p className="text-black-4">Level I of the CFA* Exam</p>
              </div>
            </div>
          </div>
          <div className=" filter drop-shadow-lg bg-white p-8 mx-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intega aliquam lectus risus ut vestibulum consequat comodo lorem. Risus, in eget tristique commodo lectus mattis et.</p>
            <div className="flex flex-row mt-4">
              <img src="/asset/icon/ava2.png" alt="photo profile" />
              <div className="flex flex-col ml-4">
                <h1 className="font-bold align-center">John Doe</h1>
                <p className="text-black-4">Level I of the CFA* Exam</p>
              </div>
            </div>
          </div>
          <div className=" filter drop-shadow-lg bg-white p-8 mx-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intega aliquam lectus risus ut vestibulum consequat comodo lorem. Risus, in eget tristique commodo lectus mattis et.</p>
            <div className="flex flex-row mt-4">
              <img src="/asset/icon/ava3.png" alt="photo profile" />
              <div className="flex flex-col ml-4">
                <h1 className="font-bold align-center">John Doe</h1>
                <p className="text-black-4">Level I of the CFA* Exam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-1 py-20 px-20">
        <h1 className="text-white font-bold text-4xl mb-4">Upcoming Exams</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6">
              <div className="flex flex-row gap-4">
                <img className='w-12 h-12' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
                <div>
                  <p className="font-bold self-center">The Hindu Vocab Exam</p>
                  <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span> Engineering</p>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex gap-2 text-black-3 gap-4">
                  <img className='w-5 h-5' src="/asset/icon/ic_clock.png" alt="icon paper" />
                  <span>120 mins duration </span>
                </div>
                <div className="flex gap-2 text-black-3 gap-4">
                  <img className='w-5 h-5' src="/asset/icon/ic_signal.png" alt="icon paper" />
                  <span>3 Section</span>
                </div>
                <div className="flex gap-2 text-black-3 gap-4">
                  <img className='w-5 h-5' src="/asset/icon/ic_date.png" alt="icon paper" />
                  <span>12 Jan ~ 20 Feb 2020</span>
                </div>
              </div>
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Exam</button>
              <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <h1 className="text-2xl text-center font-bold text-blue-1 p-1">Lates news from us</h1>
        <p className="text-black-4 mx-8 mt-1 text-center">Read and get inspired by these latest news curated by us</p>

        <div className="grid md:grid-cols-3 px-4 gap-4 md:px-20 mt-8">
          <div>
            <img src="/asset/img/news1.png" alt="news image" />
            <p className="text-black-3">12/07/2021</p>
            <h1 className="font-bold text-xl">Learn From Home Can Be Fun And More Colorful Nowadays</h1>
            <p className="text-yellow-1">Read More</p>
          </div>
          <div>
            <img src="/asset/img/news2.png" alt="news image" />
            <p className="text-black-3">12/07/2021</p>
            <h1 className="font-bold text-xl">Learn From Home Can Be Fun And More Colorful Nowadays</h1>
            <p className="text-yellow-1">Read More</p>
          </div>
          <div>
            <img src="/asset/img/news3.png" alt="news image" />
            <p className="text-black-3">12/07/2021</p>
            <h1 className="font-bold text-xl">Learn From Home Can Be Fun And More Colorful Nowadays</h1>
            <p className="text-yellow-1">Read More</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-6 flex-row items-center text-center">
        <h1 className="text-4xl text-center  font-bold text-blue-1 p-1">Start your preparation for now</h1>
        <p className="text-black-3 mx-4 mt-3 text-center">Makes your exam preparation more simplified with Examz</p>
        <button className="mt-8 bg-blue-1 p-4 rounded-lg text-white">Get Started For Free</button>
      </section>

      <section>
        <Footer />
      </section>

    </>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser, registerUser })(Landing);
