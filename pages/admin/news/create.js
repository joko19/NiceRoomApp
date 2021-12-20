import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../components/Cards/Card";
import Admin from "../../../Layout/Admin";
import Image from "next/image";
import { useState } from 'react'
import apiNews from "../../../action/news";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

export default function Create(props) {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState()
  const [tag, setTag] = useState()
  const [tags, setTags] = useState([])
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const chooseImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const submitNews = async (req) => {
    const data = new FormData()
    data.append("title", req.title)
    data.append("sub_title", req.subtitle)
    data.append("description", "hello world")
    for (let i = 0; i < tags; i++) {
      data.append("tags", tags[i])
    }
    data.append("image", file)
    // for console log
    // for (var key of data.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    await apiNews.create(data)
      .then((res) => {
        console.log(res)
        onOpenSuccessModal()
      })
      .catch((err) => console.log(err))
  }

  const handleKeyDown = (event) => {
    console.log(event.target.value)
    if (event.key === 'Enter') {
      setTags([...tags, event.target.value])
      setTag('')
      console.log(tags)
      // tags.push(event.target.value)
    }
  }

  const handleRemoveItem = (e) => {
    console.log(e.target.getAttribute("name"))
    const name = e.target.getAttribute("name")
    setTags(tags.filter(item => item !== name));
  };

  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()

  return (
    <div className="md:py-12">
      <Link href="/admin/news">
        <a className="flex gap-4 text-blue-1 my-8"><FaAngleLeft /> Back</a>
      </Link>
      <Card
        className="md:mt-8 w-full  bg-white"
        title="Create News" >
        <form>
          {image === null && (
            <div className="p-8 border-dashed border-4 border-black self-center justify-center">
              <center>
                <label htmlFor="file-input">
                  <Image src="/asset/icon/ic_upload.png" alt="icon upload" htmlFor="" width={24} height={24} className="mx-auto cursor-pointer" />
                </label>
              </center>
              <p className="text-center text-blue-1">Upload Image</p>
            </div>
          )}
          {image !== null && (
            <center>
              <img src={image} alt="image preview" className="object-cover" />
              <label htmlFor="file-input">
                <Image src="/asset/icon/ic_upload.png" alt="icon upload" htmlFor="" width={24} height={24} className="mx-auto cursor-pointer" />
                <p className="text-center text-blue-1">Change Image</p>
              </label>
            </center>
          )}
          <input type="file" accept="image/*" className="hidden" id="file-input" onChange={chooseImage} />
          <p className="mt-4">News Title</p>
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Title"  {...register("title", { required: true })} />
          <p className="mt-4" >Sub-Title</p>
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Sub-Title" {...register("subtitle", { required: true })} />
          <p className="mt-4">Description</p>
          <p className="mt-4">Tags</p>
          <div className="flex border p-2">
            {tags.map((item) => (
              <span key={item} className="bg-blue-6 p-2 m-1 rounded text-blue-1">{item}<span className="ml-1 cursor-pointer" name={item} onClick={handleRemoveItem}> x</span> </span>
            ))}
            <input type="text" onKeyDown={handleKeyDown} onChange={(e) => setTag(e.target.value)} value={tag} className="flex p-2 flex-auto outline-0" placeholder="Input Tag" />
          </div>
          <div className="flex flex-row-reverse">
            <button type="submit" onClick={handleSubmit(submitNews)} className="bg-blue-1 text-white p-4 rounded-lg">Post News</button>
          </div>
        </form>
      </Card>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              <p> News Created Successfully </p>
              <div className="self-center">
                <Link href="/admin/news">
                  <a className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3">Okay</a>
                </Link>
                {/* <button className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3" onClick={() => {
                  onCloseSuccessModal()
                }}>Okay</button> */}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

Create.layout = Admin