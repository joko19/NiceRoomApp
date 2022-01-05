import Card from "../../components/Cards/Card";
import Admin from "../../Layout/Admin";
import Link from 'next/link'
import Image from 'next/image'
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";


export default function Index(props) {
  const TableHead = ['Name', 'Email', 'Phone', 'Action']
  const list = [1, 2, 3, 4]
  const institute = [1,2,3,4,5,6,7,8]
  return (
    <div className="mt-16 w-full mb-16">
      <div className="flex">
        <div className=" w-full">
          <div className="flex gap-2">
            <div className="flex w-full gap-4 p-4 bg-white rounded-lg my-4">
              <img className="w-16 h-16" src="/asset/icon/table/ic_school.png" />
              <div>
                <p className="font-bold text-blue-1 text-2xl">
                  240
                </p>
                <p className="text-black-4">Registered Institute</p>
              </div>
            </div>
            <div className="flex w-full gap-4 p-4 bg-white rounded-lg ml-4 my-4">
              <img className="w-16 h-16" src="/asset/icon/table/ic_read.png" />
              <div>
                <p className="font-bold text-yellow-1 text-2xl">
                  120.000
                </p>
                <p className="text-black-4">Student Joined</p>
              </div>
            </div>
          </div>
          <div>
            <Card
              className="w-full  bg-white"
              title="Operator Team"
              right={(
                <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg">
                  + Add Operator
                </button>
              )}>
              <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Operator" />

              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="table md:min-w-full overflow-auto divide-y divide-gray-200">
                        <thead className="bg-black-9" >
                          {TableHead.map((item) => (
                            <th key={item} scope="col" className="px-6 py-3 text-left tracking-wider">
                              {item}
                            </th>
                          ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {list.map((item) => (
                            <tr key={item.email}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div>Name {item}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>Email {item}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span>
                                  Phone {item}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                                  // getDetail(item.id)
                                  // setSelectedData(item.id)
                                  // setUpdate(true)
                                  // onOpenCreateModal()
                                }}>
                                  <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                                </button>
                                <button href="#" className="text-indigo-600 hover:text-indigo-900">
                                  <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" onClick={() => {
                                    setSelectedData(item.id),
                                      onOpen()
                                  }} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex mt-8 flex-row-reverse flex-end gap-4">
                      <button className={`${false ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
                        if (page !== lastPage) {
                          doData(search, limit, lastPage)
                        }
                      }}>
                        <FaAngleDoubleRight />
                      </button>
                      <button className={`${false ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`} onClick={() => {
                        if (page < lastPage) {
                          doData(search, limit, page + 1)
                        }
                      }}>
                        <FaAngleRight />
                      </button>
                      <button className={`${false ? 'bg-black-6' : 'cursor-default'} p-1  rounded-full align-middle`} onClick={() => {
                        if (page > 1) {
                          doData(search, limit, page - 1)
                        }
                      }}>
                        <FaAngleLeft />
                      </button>
                      <button className={`${false ? 'bg-black-6' : 'cursor-default'} rounded-full p-1`}>
                        <FaAngleDoubleLeft />
                      </button>
                      <span> 1 - 10 from 4</span>
                      <select className="bg-white"  >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                      <span>Data per page : </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="md:flex flex-col p-4 m-4 hidden sm:w-1/3 md:w-1/3 bg-white rounded-lg">
          <h1 className="p-4 font-bold">List Institute</h1>
          <input type="text" className="p-4 border rounded-lg w-full mb-4" placeholder="Search Institute" />
          {institute.map((item) => (
            <div key={item} className="border-b py-4">
              <span className="border p-2 rounded">{item}</span><span className="font-bold"> &nbsp; Institute {item}</span><span className="text-black-5" > (200 Student)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
Index.layout = Admin