import Image from "next/image"

export function HeaderInstruction({itemSection, index }) {
  return (
    <div className="flex flex-col bg-black-8 rounded-lg mb-4 p-5">
      <div className="flex">
        <div className="w-full">
          Section {index + 1}
          <p className="font-bold mt-1">  <Image src="/asset/icon/table/ic_section.png" width={16} height={16} />   {itemSection?.name}</p>

        </div>
        <div className="w-full">
          Duration
          <p className="font-bold mt-1" >  <Image src="/asset/icon/table/ic_timer.png" width={16} height={16} />   {itemSection?.duration} Minute</p>
        </div>
      </div>
      <div className="mt-3">
        Instruction
        <div className="text-container" dangerouslySetInnerHTML={{ __html: itemSection?.instruction }} />
      </div>
    </div>
  )
}
