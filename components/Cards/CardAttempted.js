import React from "react";
import Button from "../Button/button";
import Image from 'next/image'

export default function CardAttempted({ isLive = false, type = false }) {
  return (
    <div className="flex-nowrap min-w-max m-2 bg-white rounded-lg pt-4 px-4 ">
      <div className="flex flex-row gap-4">
        <img className='w-9 h-9 my-auto' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div className='w-full'>
          <div className='flex justify-between'>
            <p className="font-bold self-center">The Hindu Vocab Exam</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16} src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>120 mins duration </span>
        </div>
        {type === 'exam' && (
          <div className="flex gap-2 text-black-3 gap-4">
            <Image height={16} width={16} src="/asset/icon/ic_volume.svg" alt="icon paper" />
            <span>3 Section</span>
          </div>
        )}
        <div className="flex gap-2 text-black-3 gap-4">
          <img  src="/asset/icon/ic_date.svg" alt="icon paper" className="z-0 " />
          <span>12 Jan ~ 20 Feb 2020</span>
        </div>
      </div>
      <button className={`bg-white text-blue-1 border w-full border-blue-1 mt-2 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`}>View Score</button>
      <Button title="Re-attempt" className="w-full my-2" />
    </div>
  )
}