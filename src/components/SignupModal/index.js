"use client"

import React, { useState } from 'react';
import { auth } from '@/app/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useModal } from '@/context/Modal';
import SignInForm from '../SignInModal';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setModalContent, closeModal } = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        closeModal();
        localStorage.setItem('User-Info', JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage }
      });
  }

  return (
    <div className='text-black'>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 h-96 p-8 items-center justify-between border-2 border-border-blue rounded-2xl bg-nav-background">
        <h1 className='text-3xl'>Sign up</h1>

        <input
          placeholder="Email Address"
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-64 h-11 p-2 rounded-sm outline-none bg-nav-background border border-gray-400'
        />
        <input
          placeholder="Password"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="new-password"
          autoComplete='on'
          className='w-64 h-11 p-2 rounded-sm outline-none bg-nav-background border border-gray-400'
        />
        <input
          placeholder="Confirm Password"
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          name="new-password"
          autoComplete='on'
          className='w-64 h-11 p-2 rounded-sm outline-none bg-nav-background border border-gray-400'
        />

        <button className='bg-purple text-white w-36 h-11 rounded-full font-bold text-lg' type="submit" onClick={handleSubmit}>Sign up</button>
        <div>Already have an account? <a className='cursor-pointer text-blue-500' onClick={() => setModalContent(<SignInForm />)}>Login</a>!</div>
      </form>
    </div>
  )
}

export default SignupForm;
