import React from 'react'

function Header(props) {
  const product = ['Test Series', 'Quizzes', 'Prev Paper', 'Upcoming Exam', 'Exams']
  const about = ['Vision & Mission', 'Our Team', 'Platforms', 'Funding', 'Careers']
  return (
    <div className="flex bg-blue-1 md:px-12 py-4 gap-8 justify-between fixed w-full top-0 z-50">
      <h1 className="text-white text-4xl mx-4">Examz.</h1>
      <div>
        <ul className="pt-4 hidden md:flex text-white flex flex-row gap-5">
          <li >Test Series</li>
          <li>Quizzes</li>
          <li>Prev Papper</li>
          <li>Upcoming Exam</li>
          <li>Exam</li>
        </ul>
      </div>
      <div className="hidden md:flex">
        <button className="bg-white text-blue-1 rounded-lg p-3 mx-4">Select Category</button>
        <button className="text-white border rounded-lg p-3">Register</button>
      </div>
    </div>
  )
}

export default Header