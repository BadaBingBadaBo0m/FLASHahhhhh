"use client"

import React, { useState } from "react";
import { useModal } from "@/context/Modal";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";

const DeleteDeckForm = ({deckId}) => {
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await deleteDoc(doc(db, "Decks", deckId));
    closeModal();
  }
  
  return (
    <>
        <div className="flex flex-col p-5 rounded-full justify-around items-center w-106">
            <h1 className="text-black text-2xl">Are you sure want to delete this deck?</h1>
            <div className="my-5 flex justify-around w-2/4">
                <button onClick={closeModal} className="text-black bg-blue-500 rounded-full p-2">Cancel</button>
                <button onClick={handleSubmit} className="text-black bg-blue-500 rounded-full p-2">Delete</button>
            </div>
        </div>
    </>
  )
};

export default DeleteDeckForm;