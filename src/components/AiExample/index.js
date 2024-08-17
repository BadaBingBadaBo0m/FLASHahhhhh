"use client"

import React, { useEffect, useState } from "react";
import Carousel from "../Carousel";
import { runGemini } from "@/app/gemini";

const AiExample = () => {
  const [slides, setSlides] = useState([]);

  const generateCards = async () => {
    const res = await runGemini("US History", 5);

    setSlides(res.Cards)
  }

  // useEffect(() => {
  //   if (!slides.length) generateCards();
  // }, [])

  return (
    <div>
      <h1>Bruh</h1>
      <button onClick={generateCards}>Generate Cards</button>

    </div>
  )
};

export default AiExample;
