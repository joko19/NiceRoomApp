import React from 'react'
import Image from 'next/image'

function Footer(props) {
  const product = ['Quizzes', 'Prev Paper', 'Upcoming Exam', 'Exams']
  const about = ['Vision & Mission', 'Our Team', 'Platforms', 'Funding', 'Careers']
  return (
    <>
      {/* desktop */}
      <div div className={`w-full hidden md:inline-block bg-blue-1 text-white py-5`}>
        <div className={` md:w-full md:p-12 lg:w-full grid md:grid-cols-4 p-4 justify-center gap-4 mt-4`}>
          <div>
            <h1 className="font-bold text-2xl"> Examz.</h1>
            <p className="text-sm mt-6">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc quam ac sed turpis volutpat. Cursus sed massa non nisi, placerat.
            </p>
            <div className="flex mt-4 gap-4">
              <div className='w-8'>
                <img className='object-cover' src="/asset/icon/footer/ic_instagram.png" alt="instagram" />
              </div>
              <div className='w-8'>
                <img className='object-cover' src="/asset/icon/footer/ic_twitter.png" alt="twitter" />
              </div>
              <div className='w-8'>
                <img className='object-cover' src="/asset/icon/footer/ic_youtube.png" alt="youtube" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl">Quick Links</h1>
            <ul className="text-sm mt-6">
              {product.map((item) => (
                <li key={item} className="mb-4">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl">About Us</h1>
            <ul className="text-sm mt-6">
              {about.map((item) => (
                <li key={item} className="mb-4">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl">Reach Us </h1>
            <ul className="text-sm mt-6">
              <li className="mb-4"><img src="/asset/icon/footer/ic_mail.png" className="inline w-6 mr-2" />hello@examz.io</li>
              <li className="mb-4"><img src="/asset/icon/footer/ic_phone.png" className="inline w-6 mr-2" /> +91 01234 56789</li>
              <li className="mb-4"><img src="/asset/icon/footer/ic_location.png" className="inline w-6 mr-2" /> 772 Mountain Ave
                Bangalore, India 92451</li>
            </ul>
          </div>
        </div >
        <div className="md:px-10 md:flex md:justify-between mx-4">
          <p>© 2021 Examz. All rights reserved</p>
          <p>Terms & Conditions | Privacy Policy | Sitemap | Disclaimer</p>
        </div>
      </div>
      {/* mobile */}
      <div className='bg-blue-1  md:hidden text-white  p-4' >
        <div className='flex'>
          <div className='w-full'>
            <h1 className="font-bold text-xl">About Us</h1>
            <ul className="text-sm mt-6">
              {about.map((item) => (
                <li key={item} className="mb-4">{item}</li>
              ))}
            </ul>
          </div>
          <div className='w-full'>
            <h1 className="font-bold text-xl">Quick Links</h1>
            <ul className="text-sm mt-6">
              {product.map((item) => (
                <li key={item} className="mb-4">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl">Reach Us </h1>
          <ul className="text-sm mt-6">
            <li className="mb-2"><img src="/asset/icon/footer/ic_mail.png" className="inline w-6 mr-2" />hello@examz.io</li>
            <li className="mb-2"><img src="/asset/icon/footer/ic_phone.png" className="inline w-6 mr-2" /> +91 01234 56789</li>
            <li className="mb-2"><img src="/asset/icon/footer/ic_location.png" className="inline w-6 mr-2" /> 772 Mountain Ave
              Bangalore, India 92451</li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-2xl text-center mt-4"> Examz.</h1>
          <div className="flex mt-2 mx-auto justify-center gap-4">
            <div className='w-8'>
              <img className='object-cover' src="/asset/icon/footer/ic_instagram.png" alt="instagram" />
            </div>
            <div className='w-8'>
              <img className='object-cover' src="/asset/icon/footer/ic_twitter.png" alt="twitter" />
            </div>
            <div className='w-8'>
              <img className='object-cover' src="/asset/icon/footer/ic_youtube.png" alt="youtube" />
            </div>
          </div>
          <p className='text-center'>Term Conditions | Privacy Policy</p>
          <p className='text-center'>© 2021 Examz. All rights reserved</p>
        </div>
      </div>
    </>

  )
}
export default Footer