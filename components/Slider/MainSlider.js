import React, { useRef } from "react";
import { TitleButton } from "./TitleButton";
import Slider from '../Slider/Slider.js'
import CardExams from "../Cards/CardExams";
import CardQuizzes from "../Cards/CardQuizzes";
import CardAttempted from '../Cards/CardAttempted'
import CardPractice from "../Cards/CardPractice";

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
      <TitleButton title={title} isLive={isLive} count={data.length} url={urlSeeAll} />
      <Slider ArrowColor="blue" count={data.length} >
        {data.map((item, index) => (
          <>{type === 'exams' && (
            <CardExams key={index} data={item} url={`/student/exams/${item.slug}`} />
          )}
            {type === 'quiz' && (
              <CardQuizzes key={index} data={item} url={`/student/quizzes/${item.slug}`} />
            )}
            {type === 'practice' && (
              <CardPractice key={index} data={item} url={`/student/practice/${item.slug}`} />
            )}
            {type === 'attemptedQuiz' && (
              <CardAttempted key={index} data={item} url={`/student/quizzes/${item.slug}`} score={`/student/quizzes/${item.quiz.slug}/${item.id}`} />
            )}
            {type === 'attemptedExams' && (
              <CardAttempted key={index} data={item} url={`/student/exams/${item.slug}`} score={`/student/exams/${item.exams.slug}/${item.id}`} />
            )}
          </>
        ))}
      </Slider>
    </>
  )
}