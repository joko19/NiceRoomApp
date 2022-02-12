import Image from "next/image"
import Link from "next/link"

export function TitleButton({ title, url, isLive = false }) {
  return (
    <div className='flex align-middle'>
      {isLive && (<img src="/asset/icon/ic_live_transparent.png" alt="icon live" className='w-8 h-8 mr-2' />)}
      <span className="text-2xl mr-2">{title}</span>
      <Link href={url}>
        <a className='inline-block hover:text-blue-1 mt-2'>
          See All
        </a>
      </Link>
    </div>
  )
}
