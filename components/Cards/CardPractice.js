import React from "react";
import Button from "../Button/button";
import Image from 'next/image'

export default function CardPractice({isLive= false, data}) {
  return (
    <div className="flex-nowrap min-w-max  mr-2 mt-2 md:inline-block  bg-white rounded-lg pt-4 px-4 ">
      <div className="flex flex-row gap-4">
        <img className='w-9 h-9 my-auto' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div className='w-full'>
          <div className='flex justify-between'>
            <p className="font-bold self-center">{data?.name}</p> 
          </div>
          <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span></p>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16}  src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>{data?.duration} mins duration </span>
        </div>
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16}src="/asset/icon/ic_volume.svg" alt="icon paper" />
          <span>{data?.total_section} Section</span>
        </div>
      </div>
      <Button title="Start Practice" className="w-full my-4" />
      {/* <p className="text-black-3 text-sm text-center my-4">200 Student are writing this exam</p> */}
    </div>
  )
}