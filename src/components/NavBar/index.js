"use client"

import React from 'react';
import SignInForm from '../SignInModal';
import SignupForm from '../SignupModal';
import { useModal } from '@/context/Modal';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase';

const NavBar = () => {
  const { setModalContent } = useModal();
  const router = useRouter();
  const currentUser = auth.currentUser;

  const SignOutUser = () => {
    auth.signOut();
    console.log("signed out user", currentUser)
    router.push('/')
    router.refresh();
  }

  return (
    <div className='flex justify-between p-5 bg-Navbar h-20 sticky top-0 z-50'>
      <h1 className='flex items-center text-purple text-4xl font-bold' onClick={() => router.push("/")}>FLASH<span className='text-xs ml-1 text-blue-400'>ahhhhh</span></h1>

      <div id='nav-button-container'>
        {currentUser ?
          <>
            <button className='bg-purple w-20 h-10 rounded-l-lg font-bold text-sm mr-[3px]' onClick={() => router.push('/decks')}>Flashcards</button>
            <button className='bg-purple w-20 h-10 rounded-r-lg font-bold text-sm' onClick={() => SignOutUser()}>Sign Out</button>
          </>
          :
          <>
            <button className='bg-purple w-20 h-10 rounded-l-lg font-bold text-sm mr-[3px]' onClick={() => setModalContent(<SignInForm />)}>Sign In</button>
            <button className='bg-purple w-20 h-10 rounded-r-lg font-bold text-sm' onClick={() => setModalContent(<SignupForm />)}>Sign Up</button>
          </>
        }
      </div>
    </div>
  )
};

export default NavBar;
