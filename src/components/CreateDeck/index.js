"use client"

import React, { useState } from "react";
import { useModal } from "@/context/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import { auth } from '../../app/firebase';

const CreateDeckForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const { closeModal } = useModal();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.length > 20 || description) {
      if (!name || name.length > 20) setNameError("Name must be between 1 and 20 characters");


      if (name && name.length <= 20) setNameError("");

      if (description.length > 50) setDescriptionError("Description must be less than 50 characters");
      console.log(description.length, "length")

      return;
    }

    if (!name) return;

    await addDoc(collection(db, "Decks"), {
      Name: name,
      Description: description,
      Cards: [],
      ownerId: currentUser.uid
    });

    setName("");
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-around items-center w-80 p-12">
      <h1 className="text-purple text-2xl font-bold mb-2">Create Deck</h1>

      {nameError ? (
        <>
          <p className='text-red-700 text-lg text-center'>{nameError}</p>
        </>
      ) : (
        <></>
      )}

      <input
        placeholder="Name"
        type="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-black border border-gray-400 p-2 outline-none w-60 mb-5"
      />

      {descriptionError ? (
        <>
          <p className='text-red-700 text-lg text-center'>{descriptionError}</p>
        </>
      ) : (
        <></>
      )}

      <textarea
        placeholder="Description (Optional)"
        type="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-black border border-gray-400 p-2 resize-none w-60 h-18 outline-none mb-5"
      />

      <button onClick={handleSubmit} className="text-white bg-purple rounded-xl p-3 w-40">Create Deck</button>
    </form>
  )
};

export default CreateDeckForm;
