"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc, deleteField} from "firebase/firestore";
import { db } from "../../app/firebase";
import { Router } from "next/router";
import { useRouter } from 'next/navigation';

const CardComponent= ({card, index, currentSet, currentDeck}) =>{
    const router = useRouter();
    const cards = currentDeck.Cards;
    const [updatedCards, setUpdatedCards] = useState(cards);
    const [editingCard, setEditingCard] = useState(false);
    const [newQuestion, setNewQuestion] = useState(card.question);
    const [newAnswer, setNewAnswer] = useState(card.answer);

    const editCard = async (e) => {
        e.preventDefault();
        updatedCards.splice(index, 1, {question: newQuestion, answer: newAnswer});
        await updateDoc(currentSet, {
           Cards: updatedCards
        });
        setUpdatedCards(cards);
        setEditingCard(false)
        router.refresh();
    }

    const deleteCard = async (e) => {
        e.preventDefault();
        updatedCards.splice(index, 1);
        await updateDoc(currentSet, {
           Cards: updatedCards
        });
        setUpdatedCards(cards);
        router.refresh();
    }

    return (
        <div className="text-lg grid grid-cols-6 grid-rows-1 gap-4 w-full p-3 my-5 text-black border-black border-2">
            {editingCard ? (
                <>
                        <input
                            className=" col-span-2 p-2"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)} />
                        <input
                            className=" col-span-2 col-start-3 border-black p-2 text-black"
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)} />
                    <button onClick={editCard} className="col-start-5 border rounded-full bg-purple text-white p-2">Edit</button>
                </>
            ) : (
                <>
                    <div className="col-span-2 p-2 ">
                        <h1 className="border-black">{card.question}</h1> 
                     </div>
                    <div className="col-span-2 col-start-3 border-black p-2 text-black">
                        <h1>{card.answer}</h1>
                    </div>
                    <button onClick={() => setEditingCard(true)} className="col-start-5 border rounded-full bg-purple text-white p-2">Edit</button>
                </>
            )}

            <button onClick={deleteCard} className="col-start-6 bg-purple text-white border-2 border-black rounded-full p-2">Delete</button>
        </div>
    );
}

export default CardComponent;