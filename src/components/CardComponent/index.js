"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc, deleteField} from "firebase/firestore";
import { db } from "../../app/firebase";

const CardComponent= ({card, index, currentSet, currentDeck}) =>{
    const cards = currentDeck.Cards;
    const [updatedCards, setUpdatedCards] = useState(cards);
    const [editCard, setEditCard] = useState(false);

    const deleteCard = async (e) => {
        e.preventDefault();
        updatedCards.splice(index, 1);
        await updateDoc(currentSet, {
           Cards: updatedCards
        });
        setUpdatedCards(cards);
    }

    return (
        <div className="text-lg grid grid-cols-6 grid-rows-1 gap-4 w-full p-3 my-5 text-black border-black border-2">
            <div className="col-span-2 p-2 ">
               <h1 className="border-black">{card.question}</h1> 
            </div>
            <div className="col-span-2 col-start-3 border-black p-2 text-black">{card.answer}</div>
            <button className="col-start-5 border rounded-full bg-purple text-white p-2">Edit</button>
            <button onClick={deleteCard} className="col-start-6 bg-purple text-white border-2 border-black rounded-full p-2">Delete</button>
        </div>
    );
}

export default CardComponent;