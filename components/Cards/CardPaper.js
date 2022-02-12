import React from "react";
import Button from "../Button/button";

export default function CardPaper() {
  return (
    <div className="flex-nowrap min-w-max m-2 bg-white rounded-lg p-6">
      <div className="flex flex-row gap-4">
        <img className='w-12 h-12' src="/asset/icon/ic_a+_yellow.png" alt="icon paper" />
        <div>
          <p className="font-bold self-center">The Hindu Vocab Quiz</p>
          <p className="text-black-3 text-sm">By <span className='text-blue-1'>Student University</span> Engineering</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex gap-4 text-black-3">
          <img className='w-5 h-5' src="/asset/icon/ic_clock.svg" alt="icon paper" />
          <span>120 mins duration </span>
        </div>
        <div className="flex gap-4 text-black-3">
          <img className='w-5 h-5' src="/asset/icon/ic_date.svg" alt="icon paper" />
          <span>12 Jan ~ 20 Feb 2020</span>
        </div>
      </div>
      <Button title="Start Quiz" className="w-full mt-4" />
    </div>
  )
}