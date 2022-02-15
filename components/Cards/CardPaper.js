import React from "react";
import Button from "../Button/button";
import Image from 'next/image'

export default function CardPaper() {
  return (
    <div className="flex-nowrap min-w-max m-2 bg-white rounded-lg p-4">
      <div className="flex flex-row gap-4">
        <img className='w-12 h-12' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div>
          <p className="font-bold self-center">The Hindu  Quiz</p>
          <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span></p>
        </div>
      </div>
      <div className="flex flex-col mt-4 text-sm">
        <div className="flex gap-4 text-black-3">
          <Image height={16} width={16} src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>120 mins duration </span>
        </div>
        <div className="flex gap-4 text-black-3">
          <Image height={16} width={16} src="/asset/icon/ic_date.svg" alt="icon paper" />
          <span>12 Jan ~ 20 Feb 2020</span>
        </div>
      </div>
      <Button title="Start Quiz" className="w-full mt-4" />
    </div>
  )
}