import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.css'
// import '../styles/Landing.css'

export default function Home() {
  return (
    <>
      <section className="banner full-height">
        <div className="pt-36 pl-36 text-white">
          <h1 className="font-bold text-5xl">All-in-One Sites <br />
            for Preparation Exam</h1>
          <p className="mt-2">Makes preparation simplified with Examz</p>
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


    </>
  )
}