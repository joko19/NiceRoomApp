import Admin from "../../Layout/Admin";
import Card from "../../components/Cards/Card";
import apiInstitute from "../../action/institute";
import { useEffect, useState } from 'react'
import Image from "next/image";

export default function Institute(props) {
  const [dataInstitute, setDataInstitute] = useState([])
  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
  ]

  useEffect(async () => {
    await apiInstitute.all()
      .then((res) => {
        console.log(res.data.data.data)
        setDataInstitute(res.data.data.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="md:py-24">
      <Card
        title="Institution"
        right="Create Institusion"
      >
        <input type="text" />
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
                        Institute Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                      >
                        Year<br/> 
                        Established
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        Action
                      </th>
                    {/* </tr> */}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataInstitute.map((item) => (
                      <tr key={item.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div>{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{item.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span>
                            {item.city}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">{item.establishment_year}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_eye.png" width={16} height={16} alt="icon edit"/>
                          </a>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit"/>
                          </a>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon edit"/>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
Institute.layout = Admin