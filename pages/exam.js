import Header from "../components/header/header"
import Footer from "../components/footer/footer";

function Exam() {
  const list = [1, 2, 3]
  return (
    <div className=" bg-black-8 pt-20" >
      <Header />

      <div className="py-4 md:mx-40 mt-20">
        <div className="flex gap-4 align-text-bottom">
          <img src="/asset/icon/ic_live_transparent.png" alt="icon live" />
          <h1 className="text-3xl">Live Quiz</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-3 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6 m-4">
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
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Exam</button>
              <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 md:mx-40">
        <div className="flex gap-4 align-text-bottom">
          <h1 className="text-3xl">PO, CLERK, SO, Insurance</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-3 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6 m-4">
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
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Exam</button>
              <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 md:mx-40 mb-20">
        <div className="flex gap-4 align-text-bottom">
          <h1 className="text-3xl">IAS</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-3 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-6 m-4">
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
              <button className="bg-blue-1 text-white justify-center w-full py-2 rounded-lg mt-4">Start Exam</button>
              <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  )
}

export default Exam