import React, { useRef } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { TitleButton } from "./TitleButton";
import Slider from '../Slider/Slider.js'
import CardExams from "../Cards/CardExams";

export default function MainSlider({ title, isLive, urlSeeAll, type, data, ArrowColor, count = 0 }) {

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
    <>
      <TitleButton title={title} isLive={true} count={data.length} url={urlSeeAll} />
      <Slider ArrowColor="blue" count={data.length} >
        {data.map((item, index) => (
          <>{type === 'exams' && (
            <CardExams key={index} data={item} />
          )}
          </>
        ))}
      </Slider>
    </>
  )
}