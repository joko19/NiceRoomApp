import React from "react";
import Button from "../Button/button";
import Image from 'next/image'

export default function CardPractice({isLive= false}) {
  return (
    <div className="flex-nowrap mx-auto md:mx-2 md:inline-block m-2 bg-white rounded-lg pt-4 px-4 w-80">
      <div className="flex flex-row gap-4">
        <img className='w-9 h-9 my-auto' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div className='w-full'>
          <div className='flex justify-between'>
            <p className="font-bold self-center">The Hindu Practice Test</p> 
          </div>
          <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span></p>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16}  src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>120 mins duration </span>
        </div>
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16}src="/asset/icon/ic_volume.svg" alt="icon paper" />
          <span>3 Section</span>
        </div>
      </div>
      <Button title="Start Exam" className="w-full mt-4" />
      <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p>
    </div>
  )
}