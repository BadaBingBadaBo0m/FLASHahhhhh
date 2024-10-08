"use client"

import { useState, useRef, useEffect } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const Carousel = ({ slides }) => {
  let [current, setCurrent] = useState(0);
  let [flipCard, setFlipCard] = useState(0);

  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with blockSize
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      setWidth(Math.floor(event[0].contentBoxSize[0].inlineSize - 100));
      setHeight(Math.floor(event[0].contentBoxSize[0].blockSize - 50));
    });

    resizeObserver.observe(document.getElementById("arrow-div"));
  });

  let previousSlide = (e) => {
    e.preventDefault()
    setFlipCard(0);

    if (!flipCard) {
      if (current === 0) setCurrent(slides.length - 1);
      else setCurrent(current - 1);
    } else {
      setTimeout(() => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
      }, 500);
    }
  };

  let nextSlide = (e) => {
    e.preventDefault()
    setFlipCard(0);

    if (!flipCard) {
      if (current === slides.length - 1) setCurrent(0);
      else setCurrent(current + 1);
    } else {
      setTimeout(() => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
      }, 500);
    }
  };

  let flipSlide = (e) => {
    e.preventDefault()
    setFlipCard(!flipCard)
  }

  return (
    <div className="overflow-hidden relative h-full">
      <div
        className="flex shrink-0 transition ease-out duration-1000 h-full perspective-1000"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          width: `${slides.length * 100}%`,
        }}

      >
        {slides.map((s, index) => (
          <div
            key={index}
            className="w-full h-full flex justify-center items-center shrink-0 relative transform-style-3d transition-transform duration-700"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div
              className={`relative w-full h-full transform ${flipCard ? 'rotate-y-180' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: flipCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.7s',
              }}
            >
              <h1
                className="text-black p-5 w-full h-full flex items-center justify-center backface-hidden absolute inset-0 text-center bg-Navbar rounded-xl z-10 text-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  width: width,
                  height: height,
                  left: 90
                }}
              >
                {s.question}
              </h1>
              <h1
                className="text-black p-5 w-full h-full flex items-center justify-center backface-hidden absolute inset-0 text-center bg-Navbar rounded-xl z-10 text-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  width: width,
                  height: height,
                  left: 90
                }}
              >
                {s.answer}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div id="arrow-div" className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill color="#611f69" />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill color="#611f69" />
        </button>
      </div>

      <div
        className={`absolute h-full top-0`}
        onClick={flipSlide}
        style={{
          width: width,
          height: height,
          left: 90
        }}
      >
      </div>

      <div className="absolute bottom-0 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${i == current ? "bg-purple" : "bg-gray-500"
                }`}
            ></div>
          );
        })}
      </div>
    </div >
  );
}

export default Carousel;
