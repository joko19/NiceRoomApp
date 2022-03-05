import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Card({ children, ArrowColor, count = 0 }) {

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
    <div className='flex '>
      {count > 4 && (
        <FaAngleLeft size={32} color={ArrowColor} className='my-auto hidden md:flex mr-4 cursor-pointer'
          onClick={scrollLeft} />
      )}
      <div className='flex overflow-x-scroll md:overflow-x-hidden' ref={listRef}>
        {children}
      </div>
      {count > 4 && (
        <FaAngleRight size={32} color={ArrowColor} className='my-auto hidden md:flex ml-4 cursor-pointer'
          onClick={scrollRight} />
      )}
    </div>
  )
}