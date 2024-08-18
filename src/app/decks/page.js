"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BsPlusCircleFill } from 'react-icons/bs';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { useModal } from '@/context/Modal';
import CreateDeckForm from '@/components/CreateDeck';
import DeleteDeckForm from '@/components/DeleteDeck';

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
      <div className='h-40 p-10 text-purple'>
        <h1>Decks</h1>
      </div>

      <div className='flex flex-col items-center text-black'>
        <div id='create-deck' className='flex items-center'>
          <button className='mr-4' onClick={() => setModalContent(<CreateDeckForm />)}>
            <BsPlusCircleFill size={35} color='#3f83ec' />
          </button>
          <div>Create new deck</div>
        </div>

        {decks.map(deck => (
          <div key={`DeckList ${deck.Name} ${deck.id}`} className='flex items-center justify-between gap-5 bg-white text-black w-[70%] h-20 rounded-3xl p-8'>

            <div className='flex gap-8 items-center'>
              <h1 className='text-2xl text-purple font-bold'>{deck.Name}</h1>

              <Link href={'/carousel'}>
                <button className='bg-purple text-white w-20 h-12 rounded-xl'>Study</button>
              </Link>
            </div>



            <div className='flex gap-1 text-white'>
              <Link href={`/decks/edit/${deck.id}`}>
                <button className='bg-purple w-20 h-12 rounded-l-lg'>Edit Deck</button>
              </Link>
              <button className='bg-purple w-20 h-12 rounded-r-lg' onClick={() => setModalContent(<DeleteDeckForm deckId={deck.id} />)}>Delete Deck</button>
              {/* <button onClick={() => console.log(deck)}>Print</button> */}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
};

export default FlashCardHome;
