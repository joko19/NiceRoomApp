import Card from "../../../components/Cards/Card";
import Image from "next/image";
import { Select } from '@chakra-ui/react'
import Multiselect from 'multiselect-react-dropdown';
import Layout from "../../../Layout/Layout";
import Link from 'next/link'

export default function Quizzes(props) {
  const list = [1, 2, 3, 4]
  const tableHead = ['Quiz Name', 'Type', 'Status', 'Action']
  return (
    <>

      <div className="pt-24 md:py-24">
        <Card
          title="Quizzes"
          right={(
            <Link href="/admin/quizzes/create">
              <a className="btn btn-md bg-blue-1 text-white p-3 rounded-lg" > + Create Quiz</a>
            </Link>
          )}
        >
          <div className="flex gap-4">
            <input type="text" className="p-4 border rounded-lg w-1/2 mb-4" placeholder="Search quiz" onChange={(e) => {
              setSearch(e.target.value)
              getData(e.target.value, limit, page)
            }} />
          </div>

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table min-w-full divide-y divide-gray-200">
                    <thead className="bg-black-9" >
                      {tableHead.map((item, index) => (
                        <th key={index} scope="col" className="px-6 py-3 text-left tracking-wider"                        >
                          {item}
                        </th>
                      ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>Name {item}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>Type {item}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>Active</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                setValue("name", item.name)
                                setSelectedData(item.id)
                                setUpdate(true)
                                onOpenCreateModal()
                              }}>
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon edit" />
                            </button>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon edit" onClick={() => {
                                setSelectedData(item.id),
                                  onOpen()
                              }} />
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
    </>
  )
}
Quizzes.layout = Layout