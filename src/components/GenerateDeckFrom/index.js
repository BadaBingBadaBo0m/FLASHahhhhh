"use client"

import React, { useState } from "react"
import { useModal } from "@/context/Modal";
import { runGemini } from "@/app/gemini";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";

const GenerateDeckForm = ({ ownerId }) => {
  const [subject, setSubject] = useState("");
  const [count, setCount] = useState(null);
  const [subjectError, setsubjectError] = useState();
  const [countError, setCountError] = useState();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || subject.length > 30 || !count || count > 20) {
      if (!subject || subject.length > 30) setsubjectError("Add a name for your subject that`s between 1 and 30 characters");

      if (!count || count > 20) setCountError("Add a valid count between 1 or 20!");

      if (subject && subject.length <= 30) setsubjectError("");

      if (count && count <= 20) setCountError("");
      return;
    }

    const deck = await runGemini(subject, count);

    await addDoc(collection(db, "Decks"), {
      Name: subject,
      Cards: deck.Cards,
      Description: deck.Description,
      ownerId: ownerId
    })

    closeModal();
  }

  return (
    <form className="flex flex-col items-center gap-7 p-12" onSubmit={handleSubmit}>
      <h1 className="text-purple text-2xl font-bold">Generate new Deck</h1>

      {subjectError ? (
        <>
          <p className='text-red-700 text-lg'>{subjectError}</p>
        </>
      ) : (
        <></>
      )}

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="text-black border border-gray-400 p-2 outline-none"
      />

      {countError ? (
        <>
          <p className='text-red-700 text-lg'>{countError}</p>
        </>
      ) : (
        <></>
      )}

      <input
        placeholder="Card count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        type="number"
        disabled={false}
        className="text-black border border-gray-400 p-2 outline-none"
      />

      <button type="submit" onClick={handleSubmit} className="text-white bg-purple p-3 w-40 rounded-xl">Generate</button>
    </form>
  )
};

export default GenerateDeckForm;
