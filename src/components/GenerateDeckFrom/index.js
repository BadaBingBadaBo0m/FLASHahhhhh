"use client"

import React, { useState } from "react"
import { useModal } from "@/context/Modal";
import { runGemini } from "@/app/gemini";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";

const GenerateDeckForm = () => {
  const [subject, setSubject] = useState("");
  const [count, setCount] = useState(1);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deck = await runGemini(subject, count);

    await addDoc(collection(db, "Decks"), {
      Name: subject,
      Cards: deck.Cards
    })

    closeModal();

    console.log("bruh")
  }

  return (
    <form className="flex flex-col items-center gap-7 p-16" onSubmit={handleSubmit}>
      <h1 className="text-purple text-2xl font-bold">Generate new Deck</h1>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="text-black border border-gray-400 p-2 outline-none"
      />

      <input
        placeholder="Card count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        type="number"
        className="text-black border border-gray-400 p-2 outline-none"
      />

      <button type="submit" onClick={handleSubmit} className="text-white bg-purple p-3 w-40 rounded-xl">Generate</button>
    </form>
  )
};

export default GenerateDeckForm;
