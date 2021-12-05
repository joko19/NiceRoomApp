import React from 'react'
function Footer(props) {
  const product = ['Test Series', 'Quizzes', 'Prev Paper', 'Upcoming Exam', 'Exams']
  const about = ['Vision & Mission', 'Our Team', 'Platforms', 'Funding', 'Careers']
  return (
    <div div className={`w-full  bg-blue-1 text-white py-5`}>
      <div className={` md:w-full md:p-12 lg:w-full grid md:grid-cols-4 p-4 justify-center gap-4 mt-4`}>
        <div>
          <h1 className="font-bold text-2xl"> Examz.</h1>
          <p className="text-sm mt-6">
            Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc quam ac sed turpis volutpat. Cursus sed massa non nisi, placerat.
          </p>
          <div className="flex mt-4 gap-4">
            <img src="/asset/icon/ic_instagram.png" alt="instagram" />
            <img src="/asset/icon/ic_twitter.png" alt="twitter" />
            <img src="/asset/icon/ic_youtube.png" alt="youtube" />
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
            <li className="mb-4"><img src="/asset/icon/ic_Message.png" className="inline w-6" />hello@examz.io</li>
            <li className="mb-4"><img src="/asset/icon/ic_Mobile.png" className="inline w-6" /> +91 01234 56789</li>
            <li className="mb-4"><img src="/asset/icon/ic_Location.png" className="inline w-6" /> 772 Mountain Ave
              Bangalore, India 92451</li>
          </ul>
        </div>
      </div >
      <div className="md:px-10 md:flex md:justify-between mx-4">
        <p>© 2021 Examz. All rights reserved</p>
        <p>Terms & Conditions | Privacy Policy | Sitemap | Disclaimer</p>
      </div>
    </div>
  )
}
export default Footer