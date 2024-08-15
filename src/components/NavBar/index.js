"use client"

import React from 'react';
import SignInForm from '../SignInModal';
import SignupForm from '../SignupModal';
import { useModal } from '@/context/Modal';

const NavBar = () => {
  const { setModalContent } = useModal();

  return (
    <div className='flex justify-between p-5 bg-Navbar h-20'>
      <h1 className='flex items-center'>FLASH - <span className='text-xs ml-1'>ahhhhh</span></h1>

      <div id='nav-button-container'>
        <button className='bg-blue-500 w-20 h-10 rounded-l-lg font-bold text-sm mr-[3px]' onClick={() => setModalContent(<SignInForm />)}>Sign In</button>
        <button className='bg-blue-500 w-20 h-10 rounded-r-lg font-bold text-sm' onClick={() => setModalContent(<SignupForm />)}>Sign Up</button>
      </div>
    </div>
  )
};

export default NavBar;
