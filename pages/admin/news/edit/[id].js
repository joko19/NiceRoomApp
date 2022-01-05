import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa";
import Card from "../../../../components/Cards/Card";
import Admin from "../../../../Layout/Admin";
import apiNews from "../../../../action/news";
import { set, useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuill } from 'react-quilljs';
import instance from "../../../../action/instance";
import { useRouter } from "next/router";

export default function Create(props) {
  const Router = useRouter()
  const { id } = Router.query
  const { quill, quillRef } = useQuill();
  const [image, setImage] = useState(null)
  const [coverName, setCoverName] = useState()
  const [file, setFile] = useState(null)
  const [tag, setTag] = useState()
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState()
  const [errors, setErrors] = useState()
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const chooseImage = (e) => {
    setCoverName(e.target.files[0].name)
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  };

  const saveToServer = async (file) => {
    const body = new FormData();
    body.append('file', file);

    const res = await apiNews.imgUpload(body)
    // console.log(res.data.data)
    insertToEditor(instance.pathImg + res.data.data.image);
  };

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  const detail = async () => {
    await apiNews.detail(id)
      .then((res) => {
        const data = res.data.data
        console.log(data.tags)
        const tag = res.data.data.tags
        console.log(tag)
        if (tag !== 'null') {
          console.log("ada tag")
          const str = data.tags.replace(/['"]+/g, '').slice(1)
          const myArr = str.slice(0, str.length - 1).split(", ")
          setTags(myArr)
          console.log(myArr)
        }
        console.log(tags)
        setImage(instance.pathImg + data.image)
        setCoverName(data.image)
        setValue("title", data.title)
        setValue("subtitle", data.sub_title)
        setDescription(data.description)
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(data.description);
        }
      })
  }

  useEffect(() => {
    detail()
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML)

        quill.getModule('toolbar').addHandler('image', selectLocalImage);

        // console.log('Text change!');
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill])


  const submitNews = async (req) => {
    const data = new FormData()
    data.append("title", req.title)
    data.append("sub_title", req.subtitle)
    // for (let i = 0; i < tags; i++) {
    //   data.append("tags", tags[i])
    // }

    for (let i = 0; i < tags.length; i++) {
      console.log(tags[i])
      data.append("tags[" + i + "]", tags[i])
    }
    console.log(file)
    if (file !== null) {
      data.append("image", file)
    }
    data.append("description", description)
    // for console log
    // for (var key of data.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    await apiNews.update(id, data)
      .then((res) => {
        onOpenSuccessModal()
      })
      .catch((err) => setErrors(err.response.data.data))
  }

  const handleKeyDown = (event) => {
    // console.log(event.target.value)
    if (event.key === 'Enter') {
      setTags([...tags, event.target.value])
      setTag('')
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
        title="Edit News" >
        <form>
          {coverName === null && (
            <div className="p-8 border-dashed border-4 border-black self-center justify-center">
              <center>
                <label htmlFor="file-input">
                  <Image src="/asset/icon/ic_upload.png" alt="icon upload" htmlFor="" width={24} height={24} className="mx-auto cursor-pointer" />
                </label>
              </center>
              <p className="text-center text-blue-1">Upload Image</p>
            </div>
          )}
          {coverName !== null && (
            <div className="p-8 border-dashed border-4 border-black self-center justify-center">
              <center>
                <span>{coverName}</span> <span className="text-red-1 rounded border p-1 border-red-1 hover:cursor-pointer" onClick={() => setCoverName(null)}>x</span>
              </center>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" id="file-input" onChange={chooseImage} />
          <p className="mt-4">News Title {errors && (
            <span className="text-red-1 text-sm">{errors.title}</span>
          )}</p>
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Title"  {...register("title")} />
          <p className="mt-4" >Sub-Title {errors && (
            <span className="text-red-1 text-sm">{errors.sub_title}</span>
          )}</p>
          <input type="text" className="border w-full rounded p-4" placeholder="Input News Sub-Title" {...register("subtitle")} />
          <p className="mt-4">Description {errors && (
            <span className="text-red-1 text-sm">{errors.description}</span>
          )}</p>
          <div className="w-full h-96 mb-16">
            <div ref={quillRef} />
          </div>
          <p className="mt-4">Tags</p>
          {tags.length > 0 && (
            <div className="flex border p-4">
              {tags.map((item) => (
                <span key={item} className="bg-blue-6 p-2 m-1 rounded text-blue-1">{item}<span className="ml-1 cursor-pointer" name={item} onClick={handleRemoveItem}> x</span> </span>
              ))}
              {/* <input type="text" onKeyDown={handleKeyDown} onChange={(e) => setTag(e.target.value)} value={tag} className="flex p-2 flex-auto outline-0" placeholder="Input Tag" /> */}
            </div>
          )}
          <select className="w-full border" defaultValue="Select Tag" onClick={(e) => {
            if (e.target.value !== 'Select Tag') {
              const uniq = [...new Set([...tags, e.target.value])]
              setTags(uniq)
            }
          }}>
            <option disabled>Select Tag</option>
            <option value="Web Master">Web Master</option>
            <option value="Web Programming">Web Programming</option>
            <option value="Web Design">Web Design</option>
            <option value="Grafic Desain">Grafic Desain</option>
            <option value="Motion Grafic">Motion Grafic</option>
          </select>
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
              <p> Update News Successfully </p>
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
    </div >
  )
}

Create.layout = Admin