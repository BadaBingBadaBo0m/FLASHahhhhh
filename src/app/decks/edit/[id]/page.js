"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { BsPlusCircleFill } from 'react-icons/bs';
import { usePathname } from 'next/navigation'
import { useModal } from '@/context/Modal';

export default function DeckPage() {
  const pathname = usePathname().split('/');
  const deckId = pathname[pathname.length - 1];
  const currentSet = doc(db, "Decks", deckId);
  const [currentDeck, setCurrentDeck] = useState({});
  const [newDeckName, setNewDeckName] = useState(currentDeck.Name);
  const [newDeckDescription, setNewDeckDescription] = useState(currentDeck.Description);
  const [disableInput, setDisableInput] = useState(true);

  const getOneDoc = async () => {
    const currentSetSnap = await getDoc(currentSet);
    setCurrentDeck(currentSetSnap.data());
  }

  useEffect(() => {
    getOneDoc();
  }, []);

  const [newCard, setNewCard] = useState({ question: "", answer: "" });

  const addCard = async (e) => {
    e.preventDefault();
    if (!newCard.question || !newCard.answer) return ;
  
    const card = {
      question: newCard.question.trim(),
      answer: newCard.answer.trim(),
    };

    await setDoc(currentSet, {
      Name: currentDeck.Name,
      Cards: [...currentDeck.Cards, card]
    })

    setNewCard({ question: "", answer: "" });
  }

  const editDeck = async (e) => {
    e.preventDefault();
    if (!newDeckDescription || !newDeckName) return setDisableInput(true);
  }
  

  console.log(currentDeck.Name);
  return (
    <>
        <div className="flex justify-center my-5">
            {disableInput ? (
                <>
                    <h1 className="text-5xl">{currentDeck.Name}</h1>
                </>
            ) : (
                <input
                    className="text-5xl text-black w-fit"
                    value={newDeckName}
                    onChange={(e) => setNewDeckName(e.target.value)}
                />
            )}
        </div>
        
        <form className="grid grid-cols-5 grid-rows-1 gap-4 p-5 m-0">
        <input 
          className="col-span-2 h-10 font-bold rounded-lg p-3 text-black text-lg" 
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
        />
        <input 
          className="col-span-2 col-start-3 font-bold rounded-lg text-black h-10 p-3 text-lg"
          placeholder="Answer" 
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        />
        <button 
          onClick={addCard}
          className="col-start-5 bg-slate-950 rounded-lg  h-11 text-2xl p-1">
            +
        </button>
      </form>
        {currentDeck.Cards ? (
            <>
                {currentDeck.Cards.map((card,index) => (
                    <li key={index} className="pb-2 px-5 text-lg">
                        <input 
                        className="col-span-3 bg-white font-bold rounded-lg text-black" 
                        value={card.question} 
                        />
                        <input 
                        className="col-start-4 bg-white font-bold rounded-lg text-black" 
                        value={card.answer}
                        />
                    </li>
                ))}
            </>
        ) : (
            <>
                <h1>Add Some Cards!</h1>
                <button>Add Card</button>
            </>
        )}
    </>

  );
}