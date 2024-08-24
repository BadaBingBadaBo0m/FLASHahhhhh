"use client"

import React, { useState } from "react";
import SignupForm from "@/components/SignupModal";
import SignInForm from "@/components/SignInModal";
import { useModal } from "@/context/Modal";

const Modals = () => {
  const { setModalContent } = useModal();

  const openSignup = () => {
    setModalContent(<SignupForm />)
  };

  const openLogin = () => {
    setModalContent(<SignInForm />)
  }

  return (
    <>
      <div>
        <h1>bruh</h1>
        <button onClick={openSignup}>Open Signup</button>
        <button onClick={openLogin}>Open Login</button>
      </div>
    </>
  )
};

export default Modals;
