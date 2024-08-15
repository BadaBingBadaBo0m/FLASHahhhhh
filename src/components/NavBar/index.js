"use client"

import React from 'react';
import SignInForm from '../SignInModal';
import { useModal } from '@/context/Modal';

const NavBar = () => {
  const { setModalContent } = useModal();

  return (
    <div className='flex justify-between p-5'>
      <h1>FLASH - <span>ahhhhh</span></h1>

      <div id='nav-button-container'>
        <button className='bg-blue-500 w-20 h-10 rounded-full font-bold text-sm' onClick={() => setModalContent(<SignInForm />)}>Sign In</button>
      </div>
    </div>
  )
};

export default NavBar;
