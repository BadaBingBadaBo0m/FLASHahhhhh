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
      <div className='h-40 p-10'>
        <h1>Decks</h1>
      </div>

      <div>

        <div>
          <div id='create-deck' className='flex items-center'>
            <button className='mr-4' onClick={() => setModalContent(<CreateDeckForm />)}>
              <BsPlusCircleFill size={35} color='#3f83ec' />
            </button>

            <div>Create new deck</div>
          </div>

          {decks.map(deck => (
            <div key={`DeckList ${deck.Name} ${deck.id}`} className='flex gap-5'>
              <h1>{deck.Name}</h1>
              <Link href={`/decks/edit/${deck.id}`}>
                <button>Edit Deck</button>
              </Link>
              <button onClick={() => console.log(deck)}>Print</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default FlashCardHome;
