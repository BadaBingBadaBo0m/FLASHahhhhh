"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/Modal';
import CreateDeckForm from '@/components/CreateDeck';
import DeleteDeckForm from '@/components/DeleteDeck';
import GenerateDeckForm from '@/components/GenerateDeckFrom';

const FlashCardHome = () => {
  const [decks, setDecks] = useState([]);
  const { setModalContent } = useModal();
  const router = useRouter();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "Decks"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const deckArr = [];
      querySnapshot.forEach((doc) => {
        deckArr.push({ ...doc.data(), id: doc.id });
      });

      setDecks(deckArr);
    });
  }, []);

  return (
    <div>
      <div className='h-30 p-5 text-purple flex justify-center'>
        <h1 className='font-bold text-4xl text-center border border-b-purple w-[70%] p-5'>Decks</h1>
      </div>

      <div className='flex flex-col gap-7 items-center text-black mt-5'>
        <div id='create-deck' className='flex items-center'>
          <button onClick={() => setModalContent(<CreateDeckForm />)} className='bg-purple text-white font-bold text-1xl p-4 rounded-xl mr-4 w-52'>Create new deck</button>
          <button onClick={() => setModalContent(<GenerateDeckForm />)} className='bg-purple text-white font-bold text-1xl p-4 rounded-xl w-52'>Generate new deck</button>
        </div>

        {decks.map(deck => (
          <div key={`DeckList ${deck.Name} ${deck.id}`} className='flex items-center justify-between gap-5 bg-white text-black w-[70%] h-20 rounded-3xl p-8'>

            <div className='flex gap-8 items-center'>
              <h1 className='text-2xl text-purple font-bold'>{deck.Name}</h1>

              <Link href={`/decks/study/${deck.id}`}>
                <button className='bg-purple text-white w-20 h-12 rounded-xl'>Study</button>
              </Link>

              <p>{deck.Description}</p>
            </div>


            <div className='flex gap-1 text-white'>
              <Link href={`/decks/edit/${deck.id}`}>
                <button className='bg-purple w-20 h-12 rounded-l-lg'>Edit Deck</button>
              </Link>
              <button className='bg-purple w-20 h-12 rounded-r-lg' onClick={() => setModalContent(<DeleteDeckForm deckId={deck.id} />)}>Delete Deck</button>
              {/* <button onClick={() => console.log(deck)} className='text-black'>Print</button> */}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
};

export default FlashCardHome;
