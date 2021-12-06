import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function TestSeries() {
  const list = [1, 2, 3, 4]
  return (
    <div className=" bg-black-8 pt-20">
      <Header />
      <div className="py-4 md:mx-40 mt-20">
        <div className="flex gap-8 align-text-bottom">
          <h1 className="text-3xl">PO, CLERK, SO, Insurance</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-4 inline-block">
              <div className="flex gap-4 flex-row items-center">
                <img src="/asset/icon/ic_a+_yellow.png" alt="icon exam" />
                <p>NIACL AO Test Series</p>
              </div>
              <button className="bg-blue-1 text-white justify-center px-16 py-2 rounded-lg mt-4">View Series</button>
            </div>
          ))}
        </div>
      </div>


      <div className="md:mx-40 py-4">
        <div className="flex gap-8 align-text-bottom">
          <h1 className="text-3xl">PO, CLERK, SO, Insurance</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-4 inline-block">
              <div className="flex gap-4 flex-row items-center">
                <img src="/asset/icon/ic_a+_yellow.png" alt="icon exam" />
                <p>NIACL AO Test Series</p>
              </div>
              <button className="bg-blue-1 text-white justify-center px-16 py-2 rounded-lg mt-4">View Series</button>
            </div>
          ))}
        </div>
      </div>


      <div className="md:mx-40 py-4 pb-20">
        <div className="flex gap-8 align-text-bottom">
          <h1 className="text-3xl">PO, CLERK, SO, Insurance</h1><span className="text-2xl text-blue-1 align-text-bottom inline-block">See All</span>
        </div>
        <div className=" grid md:grid-cols-4 gap-4 my-4">
          {list.map((item) => (
            <div key={item} className="bg-white rounded-lg p-4 inline-block">
              <div className="flex gap-4 flex-row items-center">
                <img src="/asset/icon/ic_a+_yellow.png" alt="icon exam" />
                <p>NIACL AO Test Series</p>
              </div>
              <button className="bg-blue-1 text-white justify-center px-16 py-2 rounded-lg mt-4">View Series</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TestSeries