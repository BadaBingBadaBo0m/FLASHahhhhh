"use client"

import React, { useState, useEffect } from 'react'
import AiExample from "@/components/AiExample";
import Image from "next/image";
import { runGemini } from './gemini';
import Carousel from "@/components/Carousel";

export default function Home() {
  const [slides, setSlides] = useState(null);

  const generateCards = async () => {
    const res = await runGemini("US History", 5);

    setSlides(res.Cards)
  }

  useEffect(() => {
    if (!slides) generateCards();
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-between p-16">
      <div id="content-container" className="w-full min-h-screen flex flex-col items-center gap-16">

        <div className="h-96 w-[80%] bg-sub-gray rounded-3xl flex justify-between" id="ai-preview">
          <div className='w-[50%] h-full p-5'>
            <Carousel slides={slides ? slides : [{ question: "Loading...", answer: "loading..." }]} />
          </div>
          <div className='w-[50%]'>
            <h1>Automatically generate flashcards about any subject.</h1>
            <div>Just like this set about US History</div>
          </div>
        </div>
        <div className="h-96 w-[80%] bg-sub-gray rounded-3xl">

        </div>
        <div className="h-96 w-[80%] bg-sub-gray rounded-3xl">

        </div>
      </div>
    </div>
  );
}
