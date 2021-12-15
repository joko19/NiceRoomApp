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


function Home(props) {
  const [formStatus, setFormStatus] = useState('login')
  const [infoReset, setInfoReset] = useState()
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
  }

  const onLogin = async () => {
    const data = {
      email: getValues('email'),
      password: getValues('password')
    }
    props.loginUser(data)
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
    await apiAuth.forgotPassword({ email: email })
      .then((res) => {
        setInfoReset(res.data.message)
        // console.log(res.data.message)
      })
    console.log(email)
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
        <div className="grid md:grid-cols-2 mt-12">
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
                <p className="mt-4">Email / Phone</p>
                <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Email or Phone" {...register("email", { required: true })} />
                <p className="mt-4">Password</p>
                <input type="password" placeholder="Input Password" className="p-4 border w-full rounded-xl" {...register("password", { required: true, minLength: 6 })} />
                <span className="text-right text-end mt-2 text-black-3 cursor-pointer" onClick={() => setFormStatus('forgotPassword')}>Forgot Password</span>
                <button type="submit" className="w-full bg-yellow-1 text-white p-3 mt-4 rounded-xl" onClick={() => onLogin()}>Login</button>
              </form>
              <p className="text-center m-4 text-black-4">or continue with</p>
              <div className="flex gap-4">
                <button className="flex w-full justify-center gap-4 border px-6 py-3 border-yellow-1 rounded-lg" onClick={() => onLoginFacebook()}><img src="/asset/icon/ic_facebook.png" alt="login with facebook" /> Facebook</button>
                <button className="flex w-full  gap-4 justify-center border px-6 py-3 border-yellow-1 rounded-lg" onClick={() => onLoginGoogle()}><img src="/asset/icon/ic_google.png" alt="login with google" /> Google</button>
              </div>
              <p className="text-right mt-2 text-black-3">Dont you have account ?  <button onClick={() => onChangeForm('register')}>Register</button></p>

            </div>
          )}

          {formStatus === 'register' && (
            <form onSubmit={handleSubmit(onRegister)} className="my-40 bg-white rounded-lg m-4 p-4 md:m-24">
              <h1 className="text-xl text-center">Create Account</h1>
              <p className="text-black-3 text-center">create an account and get a lot of benefits</p>
              <p className="mt-4">Full Name</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Fullname"{...register("name", { required: true })} />
              <p className="mt-4">Email</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Email" {...register("email", { required: true })} />
              <p className="mt-4">Phone</p>
              <input type="number" className="p-4 border rounded-xl w-full" placeholder="Input Your Phone Number"{...register("phone", { required: true })} />
              <p className="mt-4">Password</p>
              <input type="password" placeholder="Input Password" className="p-4 border w-full rounded-xl" {...register("password", { required: true, minLength: 6 })} />
              <p className="mt-4">Password Confirmation</p>
              <input type="password" placeholder="Input Password" className="p-4 border w-full rounded-xl" {...register("password_confirmation", { required: true, minLength: 6 })} />
              <button className="w-full bg-yellow-1 text-white p-2 mt-4 rounded-xl" >Register</button>
              <p className="text-right mt-2 text-black-3">Do you have account ? <button onClick={() => onChangeForm('login')}> Login </button></p>
            </form>
          )}

          {formStatus === 'forgotPassword' && (
            <form onSubmit={handleSubmit(onForgot)} className="my-40 bg-white rounded-lg p-4 m-4 md:m-24">
              <h1 className="text-xl text-center">Forgot Password ?</h1>
              <p className="text-black-3 text-center">Enter your email or phone number to reset your password.</p>
              <p className="mt-4">Email</p>
              <input type="text" className="p-4 border rounded-xl w-full" placeholder="Input Your Email" {...register("email", { required: true })} />
              <p className="text-blue-1 text-xs">{infoReset}</p>
              <button className="w-full bg-yellow-1 text-white p-2 mt-4 rounded-xl">Submit</button>
              <p className="text-right mt-2 text-black-3 text-center">Remember Password ?  <button className="text-blue-1" onClick={() => onChangeForm('login')}>Login</button> or <button onClick={() => onChangeForm('register')}>Register</button> </p>
            </form>
          )}
        </div>
      </section>

      <section className="grid xl:grid-cols-3 md:p-1 m-4 my-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 md:px-24 mt-12">
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

      <section className="bg-blue-1 py-20">
        <h1 className="text-white font-bold text-4xl ml-16">Upcoming Exams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className="bg-white rounded-lg p-6 m-4">
            <div className="flex flex-row ">
              <img src="/asset/icon/ic_paper.png" />
              <p className="font-bold self-center ml-2">The Hindu Vocab Exam</p>
            </div>
            <div className="flex justify-between">
              <div className="text-black-3">
                <p>Duration</p>
                <p>Number of Section</p>
                <span>Started</span>
              </div>
              <div className="text-right text-black-5">
                <p>120 mins</p>
                <p>3 Section</p>
                <span>30 mins ago</span>
              </div>
            </div>
            <div className="text-blue-1 text-center bg-red border-blue-900 border rounded-lg mt-4 p-2 ">Start Exam</div>
            <p className="text-black-3 text-center my-4">200 Student are writing this exam</p>
          </div>
          <div className="bg-white rounded-lg p-6 m-4">
            <div className="flex flex-row ">
              <img src="/asset/icon/ic_paper.png" />
              <p className="font-bold self-center ml-2">The Hindu Vocab Exam</p>
            </div>
            <div className="flex justify-between">
              <div className="text-black-3">
                <p>Duration</p>
                <p>Number of Section</p>
                <span>Started</span>
              </div>
              <div className="text-right text-black-5">
                <p>120 mins</p>
                <p>3 Section</p>
                <span>30 mins ago</span>
              </div>
            </div>
            <div className="text-blue-1 text-center bg-red border-blue-900 border rounded-lg mt-4 p-2 ">Start Exam</div>
            <p className="text-black-3 text-center my-4">200 Student are writing this exam</p>
          </div>
          <div className="bg-white rounded-lg p-6 m-4">
            <div className="flex flex-row ">
              <img src="/asset/icon/ic_paper.png" />
              <p className="font-bold self-center ml-2">The Hindu Vocab Exam</p>
            </div>
            <div className="flex justify-between">
              <div className="text-black-3">
                <p>Duration</p>
                <p>Number of Section</p>
                <span>Started</span>
              </div>
              <div className="text-right text-black-5">
                <p>120 mins</p>
                <p>3 Section</p>
                <span>30 mins ago</span>
              </div>
            </div>
            <div className="text-blue-1 text-center bg-red border-blue-900 border rounded-lg mt-4 p-2 ">Start Exam</div>
            <p className="text-black-3 text-center my-4">200 Student are writing this exam</p>
          </div>
          <div className="bg-white rounded-lg p-6 m-4">
            <div className="flex flex-row ">
              <img src="/asset/icon/ic_paper.png" />
              <p className="font-bold self-center ml-2">The Hindu Vocab Exam</p>
            </div>
            <div className="flex justify-between">
              <div className="text-black-3">
                <p>Duration</p>
                <p>Number of Section</p>
                <span>Started</span>
              </div>
              <div className="text-right text-black-5">
                <p>120 mins</p>
                <p>3 Section</p>
                <span>30 mins ago</span>
              </div>
            </div>
            <div className="text-blue-1 text-center bg-red border-blue-900 border rounded-lg mt-4 p-2 ">Start Exam</div>
            <p className="text-black-3 text-center my-4">200 Student are writing this exam</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h1 className="text-2xl text-center font-bold text-blue-1 p-1">Lates news from us</h1>
        <p className="text-black-4 mx-8 mt-1 text-center">Read and get inspired by these latest news curated by us</p>

        <div className="grid md:grid-cols-3 px-4 gap-4 md:px-8 mt-8">
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

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser, registerUser })(Home);
