"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { FaPen } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { useModal } from '@/context/Modal';
import CardComponent from "@/components/CardComponent";

export default function DeckPage() {
  const pathname = usePathname().split('/');
  const deckId = pathname[pathname.length - 1];
  const currentSet = doc(db, "Decks", deckId);
  const [currentDeck, setCurrentDeck] = useState({});
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckDescription, setNewDeckDescription] = useState(currentDeck.Description);
  const [disableInput, setDisableInput] = useState(true);

  const getOneDoc = async () => {
    const currentSetSnap = await getDoc(currentSet);
    setCurrentDeck(currentSetSnap.data());
    setNewDeckName(currentDeck.Name);
    setNewDeckDescription(currentSetSnap.data().Description);
  }

  const editDeck = async (e) => {
    e.preventDefault();
    if (!newDeckName) return setDisableInput(true);
    
    await updateDoc(currentSet, {
        Name: newDeckName
    })

    setDisableInput(true)
    
    getOneDoc();
  }


  useEffect(() => {
    getOneDoc();
    setNewDeckName(currentDeck.Name)
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
    getOneDoc();
  }

  const disableInputFunction = (e) => {
    e.preventDefault()
    setDisableInput(false);
    setNewDeckName(currentDeck.Name)
  }

  return (
    <>
        <div className="flex justify-center">
            <div className="flex justify-center items-center my-5  mx-0 ">
                {disableInput ? (
                    <>
                        <h1 className="text-5xl mx-5 text-purple">{currentDeck.Name}</h1>
                        <FaPen onClick={disableInputFunction} title="Edit Deck" className="cursor-pointer text-purple" />
                        
                    </>
                ) : (
                    <>
                        <form className="flex items-center justify-around" onSubmit={editDeck}>
                            <input
                            className=" text-black text-5xl w-[90%]"
                            value={newDeckName}
                            disabled={disableInput}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            />
                            <FaPen onClick={editDeck} title="Edit Deck" className="cursor-pointer text-purple" />
                        </form>
                    </>
                )}
            </div>
        </div>

        {currentDeck?.Cards?.length > 0 ? (
            <>
                <ul className="flex-col w-2/4 justify-items-center justify-center items-center  text-center m-auto">
                    {currentDeck.Cards.map((card,index) => (
                        <li className="" key={index}>
                            <CardComponent card={card} index={index} currentSet={currentSet} currentDeck={currentDeck}/>
                        </li>
                    ))}
                </ul>
            </>
        ) : (
            <>
                <h1>Add Some Cards!</h1>
                <button>Add Card</button>
            </>
        )}

        <form className="grid grid-cols-5 grid-rows-1 gap-4 p-5 mx-[20%] w-[60%] my-auto">
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
            className="col-start-5 rounded-lg bg-purple h-11 text-2xl p-1">
            +
        </button>
      </form>
    </>
  );
}