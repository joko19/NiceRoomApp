import Admin from "../../Layout/Admin";
import Card from "../../components/Cards/Card";
import Icon from "../../components/Button/Icon";
import { useState, useEffect } from "react";
import apiAdmin from "../../action/admin";
import Image from "next/image";

export default function InstituteAdmin(props) {
  const [allAdmin, setAllAdmin] = useState([])

  useEffect(async() => {
    await apiAdmin.all()
      .then((res) => {
        console.log(res.data.data.data)
        setAllAdmin(res.data.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="md:py-24">
      <Card
        title="Institute Admin"
        right={(
          <button className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" onClick={() => {
            setSelectedData(null)
            manageModalRef.current.open()
          }}>
            + Create Admin
          </button>
        )}
      >
        <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search Admin" />

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table min-w-full divide-y divide-gray-200">
                  <thead className="bg-black-9" >
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Employee ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Institute
                    </th>
                    <th scope="col" className="text-left px-6 tracking-wider py-3">
                      Action
                    </th>
                    {/* </tr> */}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allAdmin.map((item) => (
                      <tr key={item.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div>{item.employee_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span>
                            {item.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">{item.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap ">{item.institute.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon edit" />
                          </a>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                          </a>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon edit" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex mt-8 flex-row-reverse flex-end gap-4">
                <Icon src="/asset/icon/table/ic_last.png" />
                <Icon src="/asset/icon/table/ic_next.png" />
                <Icon src="/asset/icon/table/ic_prev.png" />
                <Icon src="/asset/icon/table/ic_first.png" />
                <span> 1 - 10 from 4</span>
                <Icon src="/asset/icon/table/ic_down.png" />
                <span>Data per page : 10 </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
InstituteAdmin.layout = Admin