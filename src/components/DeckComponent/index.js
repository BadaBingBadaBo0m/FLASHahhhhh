"use client"

import React from 'react'
import Link from 'next/link';
import { auth } from '@/app/firebase';
import { useModal } from '@/context/Modal';
import DeleteDeckForm from '@/components/DeleteDeck';

const DeckComponent = ({deck}) => {
  const { setModalContent } = useModal();
  const currentUser = auth.currentUser;

  return (
    <>
      <div className='flex gap-8 items-center'>
        <h1 className='text-2xl text-purple font-bold'>{deck.Name}</h1>
        <Link href={`/decks/study/${deck.id}`}>
          <button className='bg-purple text-white w-20 h-12 rounded-xl hover:bg-fuchsia-950'>Study</button>
        </Link>

        <p>{deck.Description}</p>
      </div>

      <div className='flex gap-1 text-white'>
        <Link href={`/decks/edit/${deck.id}`}>
          <button className='bg-purple w-20 h-12 rounded-l-lg hover:bg-fuchsia-950'>Edit Deck</button>
        </Link>
        <button className='bg-purple w-20 h-12 rounded-r-lg hover:bg-fuchsia-950' onClick={() => setModalContent(<DeleteDeckForm deck={deck} currentUser={currentUser} />)}>Delete Deck</button>
      </div>
    </>
  )
}

export default DeckComponent;