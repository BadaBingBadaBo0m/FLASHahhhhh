"use client"

import React, { useState } from "react";
import SignupForm from "@/components/SignupModal";
import { useModal } from "@/context/Modal";

const Modals = () => {
  const { setModalContent } = useModal();

  const openModal = () => {
    setModalContent(<SignupForm />)
  };

  return (
    <>
      <div>
        <h1>bruh</h1>

        <button onClick={openModal}>Open modal</button>
      </div>
    </>
  )
};

export default Modals;
