import React from "react";
import Image from 'next/image'
import Link from "next/link";

export default function CardNews({cover, titile, date, idNews}) {
  return (
    <>
      <Link href={`/student/news/${idNews}`}>
        <a>
          <div className="text-sm m-2 bg-white md:inline-block rounded-lg hidden cursor-pointer hover:bg-black-7 border">
            <Image src="/asset/img/coverNews.png" height={128} width={240} alt="cover news"/>
            <p className="font-bold px-4 mt-2">Coding for the better future</p>
            <p className="text-black-5 px-4 mb-4">Posted on 8 July 2021</p>
          </div>
        </a>
      </Link>
      <Link href={`/student/news/${idNews}`}>
        <a>
          <div className="flex m-2 ccc text-sm bg-white rounded-lg border md:hidden p-2">
            <Image src="/asset/img/coverNews.png" height={150} width={200} className="object-cover" alt="cover news"/>
            <div className="my-auto">
              <p className="font-bold px-4 mt-2">Coding for the better future</p>
              <p className="text-black-5 px-4 mb-4">Posted on 8 July 2021</p>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}