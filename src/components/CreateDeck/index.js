"use client"

import React, { useState } from "react";
import { useModal } from "@/context/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";

const CreateDeckForm = ({ownerId}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("asl;dkfjasldkjf")
    if (!name) return;

    await addDoc(collection(db, "Decks"), {
      Name: name,
      Description: description,
      Cards: [],
      ownerId: ownerId
    });

    setName("");
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-around items-center w-80 h-96">
      <h1 className="text-black">Create Deck</h1>

      <input
        placeholder="Name"
        type="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-black"
      />

      <input
        placeholder="Description (Optional)"
        type="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-black"
      />

      <button onClick={handleSubmit} className="text-black bg-blue-500 rounded-full p-2">Create Deck</button>
    </form>
  )
};

export default CreateDeckForm;
