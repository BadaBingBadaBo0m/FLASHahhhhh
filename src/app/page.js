"use client"

import React, { useState, useEffect } from 'react'
import Carousel from "@/components/Carousel";
import { randomDeck } from './gemini';
import { useModal } from '@/context/Modal';
import SignupForm from '@/components/SignupModal';

export default function Home() {
  const [deck, setSlides] = useState(null);
  const { setModalContent } = useModal();

  const generateCards = async () => {
    const res = await randomDeck();
    setSlides(res)
    console.log(res, "deck")
  }

  useEffect(() => {
    generateCards();
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-between ">
      <div id="content-container" className="w-full min-h-screen flex flex-col items-center">

        <div className='bg-Navbar w-full flex flex-col items-center top-[0%] text-center absolute pt-20'>
          <h1 className='text-black font-bold text-6xl'>Studying made <span className='text-purple'>easy</span></h1>

          <button className='bg-purple p-7 rounded-lg w-56' onClick={() => setModalContent(<SignupForm />)}>GET STARTED</button>

          <div className='text-black font-bold text-2xl'>Flash is free to use for as long as you'd like</div>

          <div className='w-full h-[40rem] bg-background pt-12 flex justify-center'>
            <div className='w-[70%] h-full'>
              <Carousel slides={deck?.Cards ? deck.Cards : [{ question: "Loading...", answer: "loading..." }]} />
            </div>
          </div>

          <div className='text-black w-full bg-background flex py-14' id='pricing-div'>

            <div className='w-[50%]'>
              <div className='text-9xl text-purple'>$5</div>
            </div>

            <div className='w-[50%] text-2xl flex justify-center items-center'>
              <h1 className=''>For just $5 a month you can have an unlimited amount of decks</h1>
            </div>

          </div>


        </div>


      </div>
    </div>
  );
}
