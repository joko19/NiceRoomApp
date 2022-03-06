import React from "react";
import Button from "../Button/button";
import Image from 'next/image'
import Link from "next/link";

export default function CardAttempted({ isLive = false, type = false, data, url = '#', score = '#' }) {
  console.log(data)
  return (
    <div className="flex-nowrap min-w-max m-2 bg-white rounded-lg pt-4 px-4 ">
      <div className="flex flex-row gap-4">
        <img className='w-9 h-9 my-auto' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div className='w-full'>
          <div className='flex justify-between'>
            <p className="font-bold self-center">{data?.name}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-2 text-black-3 gap-4">
          <Image height={16} width={16} src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>{data?.duration} mins duration </span>
        </div>
        {type === 'exam' && (
          <div className="flex gap-2 text-black-3 gap-4">
            <Image height={16} width={16} src="/asset/icon/ic_volume.svg" alt="icon paper" />
            <span>{data?.total_section} Section</span>
          </div>
        )}
        {data?.started && (
          <div className="flex gap-2 text-black-3 gap-4">
            <img src="/asset/icon/ic_date.svg" alt="icon paper" className="z-0 " />
            <span>{data?.started}</span>
          </div>
        )}

      </div>

      <Link href={score} >
        <a>
          <button className={`bg-white text-blue-1 border w-full border-blue-1 mt-2 py-2 px-4 font-semibold text-sm rounded hover:bg-blue-6 hover:filter hover:drop-shadow-xl`}>View Score</button>
        </a>
      </Link><Link href={url} >
        <a>
          <Button title="Re-attempt" className="w-full my-2" />
        </a>
      </Link>
      {/* <Button title="Re-attempt" className="w-full my-2" />
       */}
    </div>
  )
}