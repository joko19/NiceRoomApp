import React from "react";
import Button from "../Button/button";
import Image from 'next/image'
import Link from "next/link";
import { ModalLogin } from "../Modal/ModalLogin";
import {
  useDisclosure
} from '@chakra-ui/react'

export default function CardQuizzes({url, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="flex-nowrap min-w-max mr-2 mt-2 bg-white rounded-lg p-4">
      <div className="flex flex-row gap-4">
        <img className='w-9 h-9 my-auto' src="/asset/icon/ic_quiz.png" alt="icon paper" />
        <div>
          <p className="font-bold self-center">{data?.name} {data?.type === 'live' && (<img className='inline ml-2' src="/asset/icon/ic_live_text.png" />)}</p>
          <p className="text-black-3 text-sm">By <span className='text-blue-1'>{data?.institute === null ? 'Examz' : data?.institute?.name}</span></p>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-4 text-black-3">
          <Image height={16} width={16} src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>{data?.duration} mins duration </span>
        </div>
        <div className="flex gap-4 text-black-3">
          <Image height={16} width={16} src="/asset/icon/ic_date.svg" alt="icon paper" />
          <span>{data?.started ? data?.started : '-'}</span>
        </div>
      </div>
      {url.split("/")[url.split("/").length - 1] !== 'undefined' ? (
        <Link href={url} >
          <a>
            <Button title="Start Quiz" className="w-full my-4" />
          </a>
        </Link>
      ) : (
        <div onClick={onOpen}>
          <Button title="Start Quiz" className="w-full mt-2" />
        </div>
      )}
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </div>
  )
}