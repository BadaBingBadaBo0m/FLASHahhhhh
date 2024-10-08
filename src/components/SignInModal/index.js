"use client"

import React, { useState } from 'react';
import { auth } from '@/app/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useModal } from '@/context/Modal';
import SignupForm from '../SignupModal';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setModalContent, closeModal } = useModal();
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        closeModal();
        setErrors("");
        return user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("invalid-email")) return setErrors("Email is Invalid!"); 
        if (errorMessage.includes("missing-password")) return setErrors("Password is Missing!"); 
        if (errorMessage.includes("invalid-credential")) return setErrors("Password is Invalid!"); 
      });

  }


  return (
    <div className='text-black'>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 h-96 p-8 items-center justify-between border-2 border-border-blue rounded-2xl bg-nav-background">
        <h1 className='text-3xl'>Sign In</h1>
        {errors ? (
          <>
            <p className='text-red-700 text-2xl'>{errors}</p>
          </>
        ) : (
          <></>
        )}
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

        <button className='bg-purple text-white w-36 h-11 rounded-full font-bold text-lg' type="submit" onClick={handleSubmit}>Sign In</button>
        <div>Don't have an account? <a className='cursor-pointer text-blue-500' onClick={() => setModalContent(<SignupForm />)}>Sign up</a>!</div>
      </form>
    </div>
  )
}

export default SignInForm;
