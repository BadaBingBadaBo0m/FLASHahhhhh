"use client"

import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot, where} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase';
import { useModal } from '@/context/Modal';
import CreateDeckForm from '@/components/CreateDeck';
import GenerateDeckForm from '@/components/GenerateDeckFrom';
import SignInForm from '@/components/SignInModal';
import DeckComponent from '@/components/DeckComponent';

const FlashCardHome = () => {
  const [decks, setDecks] = useState([]);
  const { setModalContent } = useModal();
  const currentUser = auth.currentUser;
  const userInfoObject = typeof window !== 'undefined' ? localStorage.getItem('User-Info') : "";
  const userInfo = userInfoObject ? JSON.parse(userInfoObject) : "";

  const fetchDecks = async () => {
      if (userInfo) {
        const q = query(collection(db, "Decks"), where("ownerId", "==", userInfo.uid));

        const unsubcribe = onSnapshot(q, (querySnapshot) => {
          const categories = [];
          querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
          });
          setDecks(categories);
        })
      } else return setDecks([]);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div>
      <div className='h-30 p-5 text-purple flex justify-center'>
        <h1 className='font-bold text-4xl text-center border border-b-purple w-[70%] p-5'>Decks</h1>
      </div>

      <div className='flex flex-col gap-7 items-center text-black mt-5'>
        {userInfo ? (
          <div id='create-deck' className='flex items-center'>
            <button onClick={() => setModalContent(<CreateDeckForm />)} className='bg-purple text-white font-bold text-1xl p-4 rounded-xl mr-4 w-52 hover:bg-fuchsia-950'>Create new deck</button>
            <button onClick={() => setModalContent(<GenerateDeckForm ownerId={currentUser?.uid} />)} className='bg-purple text-white font-bold text-1xl p-4 rounded-xl w-52 hover:bg-fuchsia-950'>Generate new deck</button>
          </div>
        ) : (
          <div id='create-deck' className='flex items-center'>
            <button className='bg-purple text-white font-bold text-1xl p-4 rounded-xl mr-4 w-52 hover:bg-fuchsia-950' onClick={() => setModalContent(<SignInForm />)}>Create new deck</button>
            <button className='bg-purple text-white font-bold text-1xl p-4 rounded-xl w-52 hover:bg-fuchsia-950' onClick={() => setModalContent(<SignInForm />)}>Generate new deck</button>
         </div>
        )}

        <ul className='flex-col'>
          {decks.map(deck => (
            <li key={`DeckList ${deck.Name} ${deck.id}`} className='flex items-center justify-between gap-5 bg-white text-black mb-5  h-20 rounded-3xl p-8'>
              <DeckComponent deck={deck} />
            </li>
          ))}
        </ul>


      </div>
    </div>
  )
};

export default FlashCardHome;
