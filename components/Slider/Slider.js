import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Card({ children, className = '', title = '', subtitle = '', props = null, right = null }) {

  const listRef = useRef(null);

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -300,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className='flex -mx-8'>
      <FaAngleLeft size={32} color="white" className='my-auto mr-4 cursor-pointer'
        onClick={scrollLeft} />
      <div className='flex overflow-x-hidden' ref={listRef}>
        {children}
      </div>
      <FaAngleRight size={32} color="white" className='my-auto ml-4 cursor-pointer'
        onClick={scrollRight} />
    </div>
  )
}