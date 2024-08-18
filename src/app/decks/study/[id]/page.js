"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';


const StudyDeck = () => {
  const pathname = usePathname().split('/');
  const deckId = pathname[pathname.length - 1];
  const currentSet = doc(db, "Decks", deckId);
  const [currentDeck, setCurrentDeck] = useState({});
  const [newDeckName, setNewDeckName] = useState("");

  const print = () => {
    console.log(currentDeck)
  }

  const getOneDoc = async () => {
    const currentSetSnap = await getDoc(currentSet);
    console.log(currentSetSnap)
    setCurrentDeck(currentSetSnap.data());
    setNewDeckName(currentDeck.Name);
  }

  useEffect(() => {
    getOneDoc();
    setNewDeckName(currentDeck.Name)
  }, []);

  return (
    <div className='text-black'>
      <h1 onClick={() => print()}>{currentDeck.Name ? currentDeck.Name : "Loading..."}</h1>
    </div>
  )
};

export default StudyDeck
