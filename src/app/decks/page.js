"use client"

import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

const FlashCardHome = () => {
  const [deckList, setDeckList] = useState([]);
  const router = useRouter();
  const currentUser = auth.currentUser;

  return (
    <div>
      <div className='h-40 p-10'>
        <h1>Decks</h1>
      </div>

      <div>

        <div>
          <div id='create-deck' className='flex items-center'>
            <button className='mr-4'>
              <BsPlusCircleFill size={35} color='#3f83ec' />
            </button>

            <div>Create new deck</div>
          </div>

          {deckList.map(deck => (
            <div>
              <h1>Deck</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default FlashCardHome;
