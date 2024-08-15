"use client"

import next from "next";
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const Carousel = ({ slides }) => {
  let [current, setCurrent] = useState(0);
  let [flipCard, setFlipCard] = useState(0);

  let previousSlide = (e) => {
    e.preventDefault()
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
    setFlipCard(0);
  };

  let nextSlide = (e) => {
    e.preventDefault()
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
    setFlipCard(0);
  };


  return (
    <div className="overflow-hidden relative h-3/5">
      <div
        className={`flex shrink-0 transition ease-out duration-1000 h-full`}
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          width: `${slides.length * 100}%`
        }}
      >
        {slides.map((s) => {
          return (
            <div
              className="w-full h-full flex justify-center items-center shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            >
              {flipCard ? (
                <>
                  <h1>{s.answer}</h1>
                </>
              ) : (
                <>
                  <h1>{s.prompt}</h1>
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl z-40">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-white" : "bg-gray-500"
                }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
