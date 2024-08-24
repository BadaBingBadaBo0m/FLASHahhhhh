"use client"

import React, { useState, useEffect } from 'react'
import Carousel from "@/components/Carousel";
import { randomDeck, runGemini } from './gemini';
import { useModal } from '@/context/Modal';
import SignupForm from '@/components/SignupModal';

export default function Home() {
  const [deck, setSlides] = useState(null);
  const [prompt, setPrompt] = useState("");
  const { setModalContent } = useModal();

  const generateCards = async () => {
    const res = await randomDeck();
    setSlides(res)
  }

  const generateCardButton = async () => {
    setSlides([{ question: "Loading...", answer: "loading..." }]);
    if (prompt) {
      const res = await runGemini(prompt, 5);
      setSlides(res);
      setPrompt("");
      return;
    }

    generateCards()
  }
  
  useEffect(() => {
    generateCards();
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-between ">
      <div id="content-container" className="w-full min-h-screen flex flex-col items-center">
        <div className='bg-Navbar w-full flex flex-col items-center top-[0%] text-center absolute pt-20'>
          <div className='flex flex-col gap-8 items-center pb-8'>
            <h1 className='text-black font-bold text-6xl'>Studying made <span className='text-purple'>easy</span></h1>
            <button className='bg-purple p-7 rounded-lg w-56 text-xl hover:bg-fuchsia-950 text-bold' onClick={() => setModalContent(<SignupForm />)}>GET STARTED</button>
            <div className='text-black font-bold text-2xl'>Flash is free to use for as long as you'd like</div>
          </div>
          <div className='w-full h-[40rem] bg-background pt-12 flex justify-around'>
            <div className='w-[55%] h-full flex flex-col justify-center'>
              <Carousel slides={deck?.Cards ? deck.Cards : [{ question: "Loading...", answer: "loading..." }]} />
              <div className='flex flex-col justify-center items-center'>
                <input 
                  className='text-black text-xl mt-5 rounded-lg w-[34%] px-5 p-2'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder='Leave blank for random subject'
                />
                <button onClick={generateCardButton} className='text-2xl w-[30%]  text-bold mx-0 bg-purple text-white my-5 p-5 rounded-full hover:bg-fuchsia-950'>Generate Deck</button>
                <p className='text-black text-bold text-lg -mt-5'>*Please don't spam</p>
              </div>
            </div>
            <div className='w-[30%] text-black flex flex-col text-bold text-xl -mt-32 text-left justify-center'>
                <h1 className='font-bold text-5xl mb-5'>
                  Generate Cards with a button
                </h1>
                <p>Sometimes you don't want to have to create an entire deck of flashcards by hand. So we got you covered! We generate a deck of cards for the subject you want instantly! If you still want to make your own cards you of course still can.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
