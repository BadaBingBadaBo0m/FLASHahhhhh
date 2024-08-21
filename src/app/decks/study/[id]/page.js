"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import Carousel from '@/components/Carousel';


const StudyDeck = () => {
  const pathname = usePathname().split('/');
  const deckId = pathname[pathname.length - 1];
  const currentSet = doc(db, "Decks", deckId);
  const [currentDeck, setCurrentDeck] = useState({ Cards: [{ question: "Loading...", answer: "loading..." }] });

  const print = () => {
    console.log(currentDeck)
  }

  const getOneDoc = async () => {
    const currentSetSnap = await getDoc(currentSet);
    setCurrentDeck(currentSetSnap.data());
  }

  useEffect(() => {
    getOneDoc();
  }, []);

  return (
    <div className='text-black flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-purple mt-8'>{currentDeck.Name ? currentDeck.Name : "Loading..."}</h1>

      <div className="w-[60%] h-screen m-auto pt-8 pb-40 ">
        <Carousel slides={currentDeck.Cards} />
      </div>
    </div>
  )
};

export default StudyDeck
