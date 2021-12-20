import Card from "../../components/Cards/Card";
import Admin from "../../Layout/Admin";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { store } from "../../redux/store";
import { useEffect, useState } from "react";
import apiAccount from "../../action/account";
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
import instance from "../../action/instance";

export default function Profile(props) {
  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [profile, setProfile] = useState({})
  const [avatar, setAvatar] = useState('/asset/img/blank_profile.png')
  const [file, setFile] = useState()

  useEffect(() => {
    setProfile(store.getState().auth.user.user)
    setAvatar(instance.pathImg + store.getState().auth.user.user.avatar)
  }, [])

  const onSubmit = async (req) => {
    var data = new FormData();
    data.append("name", req.firstName + " " + req.lastName)
    data.append("gender", req.gender)
    data.append("email", req.email)
    data.append("phone", req.phone)
    data.append("employee_id", req.employee_id)
    data.append("avatar", file)
    // console.log(data)
    for (var key of data.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    await apiAccount.updateProfile(data)
      .then((res) => {
        console.log(res)
        onOpenSuccessModal()
      })
      .catch((err) => console.log(err))
  }

  const choosePhoto = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  return (
    <>
      <div className="bg-blue-100 w-full">
        <Card
          className="md:mt-16 w-full bg-white"
          title="Profile" >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex">
              <div className="m-4 relative">
                <Image className="rounded-full object-cover" src={avatar} alt="photo profile" height={160} width={160} />
                <div className="absolute bottom-5 right-0">
                  <label htmlFor="file-input">
                    <Image src="/asset/icon/ic_edit.png" alt="icon update" width={48} height={48} className="ml-6 cursor-pointer" />
                  </label>
                </div>
              </div>
              <div className="hidden">
                <input id="file-input" type="file" className="hidden -z-50" accept="image/*" onChange={choosePhoto}/>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-4">
                <div className="w-full">
                  <p>First Name</p>
                  <input type="text" defaultValue={store.getState().auth.user.user.name.replace(/ .*/, '')} className="form border w-full p-4 rounded-lg" placeholder="Input Your First Name" {...register("firstName", { required: true })} />
                </div>
                <div className="flex flex-col w-full">
                  <p>Last Name</p>
                  <input type="text" className="form border p-4 rounded-lg" defaultValue={store.getState().auth.user.user.name.split(' ').slice(1).join(' ')} placeholder="Input Your Last Name" {...register("lastName", { required: true })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <p>Gender</p>
                  <select className="form border bg-white p-4 rounded-lg" placeholder="Choose Gender" defaultValue={profile.gender} {...register("gender", { required: true })} >
                    <option disabled>Choose Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <p>Email</p>
                  <input type="text" className="form border p-4 rounded-lg" defaultValue={store.getState().auth.user.user.email} placeholder="Input Your Email" {...register("email", { required: true })} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-full">
                  <p className="mt-4">Phone</p>
                  <input type="number" defaultValue={store.getState().auth.user.user.phone} className="form border p-4 rounded-lg" placeholder="Input Your Number" {...register("phone", { required: true })} />
                </div>
                <div className="flex flex-col w-full">
                  <p className="mt-4">Employee ID (Optional)</p>
                  <input type="number" className="form border p-4 rounded-lg" defaultValue={profile.employee_id} placeholder="Input Your Employee ID" {...register("employee_id")} />
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Update Profile</button>
              </div>
            </div>
          </form>
        </Card>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModal} onClose={onCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><center>Success</center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col text-center ">
              <p> Update Data Successfully </p>
              <div className="self-center">
                <button className="bg-blue-1 rounded-lg text-white mt-4 block align-center p-3" onClick={() => {
                  onCloseSuccessModal()
                }}>Okay</button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
Profile.layout = Admin