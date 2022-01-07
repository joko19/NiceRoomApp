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
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Reset(props) {
  const [old, setOld] = useState(true)
  const [newPass, setNewPass] = useState(true)
  const [confirm, setConfirm] = useState(true)
  const [errors, setErrors] = useState()
  const [hasPassword, setHasPassword] = useState(false)
  const {
    isOpen: isSuccessModal,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal
  } = useDisclosure()
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [profile, setProfile] = useState({})

  useEffect(() => {
    setProfile(store.getState().auth.user.user)
    setHasPassword(store.getState().auth.user.user.hasPassword)
  }, [])

  const onSubmit = async (data) => {

    await apiAccount.changepassword(data)
      .then((res) => {
        onOpenSuccessModal()
      })
      .catch((err) => setErrors(err.response.data.data))
  }

  return (
    <>
      <div onSubmit={handleSubmit(onSubmit)} className="bg-blue-100 w-full">
        <Card
          className="md:mt-16 w-full bg-white"
          title="Password" >
          <form className="flex flex-col">
            {hasPassword && (
              <div className="flex gap-4">
                <div className="w-full">
                  <p>Old Password {errors && (
                    <span className="text-red-1 text-sm">{errors.current_password}</span>
                  )}</p>
                  <div className="relative">
                    <input type={`${old ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" {...register("current_password")} />
                    <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                      old ? setOld(false) : setOld(true)
                    }}>
                      {old ?
                        (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                        (<FaEye className=" z-10 inline-block align-middle" />)
                      }
                    </span>
                  </div>
                </div>
              </div>
            )

            }
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col w-full">
                <p className="mt-4">New Password 
                  {errors && (
                    <span className="text-red-1 text-sm"> {errors.password}</span>
                  )}</p>
                <div className="relative">
                  <input type={`${newPass ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" {...register("password")} />
                  <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                    newPass ? setNewPass(false) : setNewPass(true)
                  }}>
                    {newPass ?
                      (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                      (<FaEye className=" z-10 inline-block align-middle" />)
                    }
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className="mt-4">Confirm New Password</p>
                <div className="relative">
                  <input type={`${confirm ? 'password' : 'text'}`} className="form w-full border p-4 rounded-lg" placeholder="Input New Password" {...register("password_confirmation")} />
                  <span className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-sm leading-5" onClick={() => {
                    confirm ? setConfirm(false) : setConfirm(true)
                  }}>
                    {confirm ?
                      (<FaEyeSlash className=" z-10 inline-block align-middle" />) :
                      (<FaEye className=" z-10 inline-block align-middle" />)
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4 mt-4">
              <button type="submit" className="bg-blue-1 p-3 rounded-lg text-white" >Update Password</button>
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
              <p> Update Password Successfully </p>
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
Reset.layout = Admin