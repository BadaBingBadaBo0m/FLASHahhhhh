"use client"

import React from "react";
import { useModal } from "@/context/Modal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";

const DeleteDeckForm = ({ deck, currentUser }) => {
  const router = useRouter();
  const { closeModal } = useModal();

  if (currentUser.uid !== deck.ownerId) router.push('/')

  const handleSubmit = async (e) => {
    e.preventDefault();

    await deleteDoc(doc(db, "Decks", deck.id));
    closeModal();
  }

  return (
    <>
      <div className="flex flex-col p-5 rounded-full justify-around items-center w-106">
        <h1 className="text-black text-2xl">Are you sure want to delete the {deck.Name} deck?</h1>
        <div className="my-5 flex justify-around w-2/4">
          <button onClick={closeModal} className="text-white bg-purple rounded-lg w-40 mr-2 p-2">Cancel</button>
          <button onClick={handleSubmit} className="text-white bg-red-600 rounded-lg w-40 p-2">Delete</button>
        </div>
      </div>
    </>
  )
};

export default DeleteDeckForm;
