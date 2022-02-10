import Card from "../../components/Cards/Card";
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Pagination from "../../components/Pagination/pagination";
import apiBranch from "../../action/branch";
import Layout from "../../Layout/Layout";
import { ModalDelete } from "../../components/Modal/ModalDelete";

export default function InstituteBranch(props) {

  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('5')
  const [page, setPage] = useState('1')
  const [status, setStatus] = useState('')
  const [update, setUpdate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState(null)
  const [selectedId, setSelectedId] = useState()
  const [statusAction, setStatusAction] = useState()
  const [dataInstitute, setDataInstitute] = useState([])
  const [list, setList] = useState([])
  const TableHead = ['Institute Name', 'Branch Name', 'State', ' City', 'Action']
  const { register, handleSubmit, setValue, getValues, reset } = useForm();


  const getData = async (search, status, limit, page) => {
    await apiBranch.index(search, status, limit, page)
      .then((res) => {
        console.log(res.data.data)
        setDataInstitute(res.data.data)
        setList(res.data.data.data)
        setPage(res.data.data.current_page)

      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData(search, status, limit, page)
  }, [])

  const onAction = async () => {
    console.log(selectedId + statusAction)
    await apiBranch.updateStatus(selectedId, { status: statusAction })
      .then(() => getData(search, status, limit, page))
  }

  return (
    <div className="mt-12">
      <Card title="Institute Branches">
        <input type="text" className="p-2 border rounded w-1/2 mb-4 text-sm" placeholder="Search Branch" onChange={(e) => {
          setSearch(e.target.value)
          getData(e.target.value, status, limit, page)
        }} />

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table md:min-w-full overflow-auto divide-y divide-gray-200 text-sm">
                  <thead className="bg-black-9" >
                    {TableHead.map((item) => (
                      <th key={item} scope="col" className="px-6 py-3 text-left tracking-wider">
                        {item}
                      </th>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {list.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div>{item.institute.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{item.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span>
                            {item.city}
                          </span>
                        </td>
                        <td className={`${item.status === 'approve' ? 'text-green-1' : 'text-red-1'} px-6 py-4 whitespace-nowrap flex text-center gap-2 text-sm font-medium`}>
                          {item.status !== 'pending' && (
                            <center> {item.status === 'approve' ? 'Approve' : 'Reject'}</center>
                          )}
                          {item.status === 'pending' && (
                            <>
                              <button href="#" className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/ic_decline.png" width={32} height={32} alt="icon rejected" onClick={() => {
                                  setSelectedId(item.id)
                                  setStatusAction("reject")
                                  onOpen()
                                }} />
                              </button>
                              <button href="#" className="text-indigo-600 hover:text-indigo-900">
                                <Image src="/asset/icon/table/ic_acc.png" width={32} height={32} alt="icon approve" onClick={() => {
                                  setSelectedId(item.id)
                                  setStatusAction("approve")
                                  onOpen()
                                }} />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={page} lastPage={dataInstitute.last_page} limit={limit} search={search} status={status} total={dataInstitute.total} doLimit={data => setLimit(data)} doData={getData} />
            </div>
          </div>
        </div>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure to {statusAction} it ?
            <div className="flex flex-row-reverse gap-4 mt-4">
              <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" onClick={() => {
                onAction()
                onClose()
              }}>Okey</button>
              <button type="button" className="text-black-4 p-3 rounded-lg" onClick={onClose}>Cancel</button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
InstituteBranch.layout = Layout