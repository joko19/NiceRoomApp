import Image from "next/image"
import Link from "next/link"
import Card from "../Cards/Card"
import { HeaderInstruction } from "./HeaderInstruction"
import Button from "../Button/button"

export function ListSession({ itemSection, onOpenDeleteModal, setSelectedData, setSelectedName, onOpen, setQuestionSelectedId, index }) {
  return (
    <Card key={index} className="my-4">
      <HeaderInstruction itemSection={itemSection} index={index} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table md:min-w-full overflow-auto divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-6" >
                  <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left tracking-wider">
                    Type Question
                  </th>
                  <th scope="col" className="px-6 py-3 text-center tracking-wider">
                    Number of Question
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-center tracking-wider">
                    <div onClick={() => {
                      setSelectedData(itemSection.id),
                        setSelectedName(itemSection.name)
                      onOpen()
                    }}>
                      <Button title="+ Add Question" />
                    </div>
                  </th>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {itemSection.questions.map((itemQuestion, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div>{index + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {itemQuestion.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {itemQuestion.items_count} Question
                      </td>
                      <td className="flex gap-4 px-6 py-4 whitespace-nowrap flex text-right gap-2 text-sm font-medium">
                        <div className="mx-auto flex gap-4">

                          <Link href={`/admin/exams/question/edit/${itemQuestion.id}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              <Image src="/asset/icon/table/fi_edit.png" width={16} height={16} alt="icon Edit" />
                              <span className="inline-block align-top">  Edit</span>
                            </a>
                          </Link>
                          <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            setQuestionSelectedId(itemQuestion.id),
                              onOpenDeleteModal()
                          }}>
                            <Image src="/asset/icon/table/fi_trash-2.png" width={16} height={16} alt="icon deleted" />
                            <span className="inline-block align-top">  Delete</span>
                          </button>
                        </div>
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
  )
}
