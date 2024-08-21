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
    const [questionError, setQuestionError] = useState("");
    const [answerError, setAnswerError] = useState("");

    const editCard = async (e) => {
        e.preventDefault();
        
        if (!newQuestion || newQuestion.length > 150 || !newAnswer || newAnswer.length >> 150) {
            if (!newQuestion || newQuestion.length > 150) setQuestionError("Question must be between 1 and 150 characters!");
      
            if (!newAnswer || newAnswer.length > 150) setAnswerError("Answer must be between 1 and 150 characters!");
      
            if (newQuestion && newQuestion.length <= 30) setQuestionError("");
      
            if (newAnswer && newAnswer.length <= 20) setAnswerError("");
      
            return;
        }
        
        updatedCards.splice(index, 1, {question: newQuestion, answer: newAnswer});
        await updateDoc(currentSet, {
           Cards: updatedCards,
           Description: currentDeck.Description,
           ownerId: currentDeck.ownerId,
           Name: currentDeck.Name
        });
        setEditingCard(false)
        setQuestionError("");
        setAnswerError("");
        router.refresh();
    }

    const deleteCard = async (e) => {
        e.preventDefault();
        updatedCards.splice(index, 1);
        await updateDoc(currentSet, {
           Cards: updatedCards,
           Description: currentDeck.Description,
           ownerId: currentDeck.ownerId,
           Name: currentDeck.Name
        });
        router.refresh();
    }

    return (
        <>
                    <div className="flex justify-center ">
        {questionError ? (
            <>
                <p className='text-red-700 text-lg '>{questionError}</p>
            </>
        ) : (
            <></>
        )}

        {answerError ? (
            <>
                <p className='text-red-700 text-lg mx-5'>{answerError}</p>
            </>
        ) : (
            <></>
        )}
    </div>
        <div className="text-lg items-center grid grid-cols-6 grid-rows-1 gap-4 w-full p-3 my-5 text-black border-black border-2">
            {editingCard ? (
                <>
                    <input
                        className=" col-span-2 p-2 break-words text-prett"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)} 
                    />
                    <input
                        className=" col-span-2 col-start-3 border-black p-2 text-black break-words text-prett"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <button onClick={editCard} className="col-start-5 border rounded-full bg-purple text-white p-2 hover:bg-fuchsia-950">Edit</button>
                </>
            ) : (
                <>
                    <div className="col-span-2 p-2 ">
                        <h1 className="border-black break-words text-pretty">{card.question}</h1> 
                     </div>
                    <div className="col-span-2 col-start-3 border-black p-2 text-black ">
                        <h1 className="text-pretty break-words">{card.answer}</h1>
                    </div>
                    <button onClick={() => setEditingCard(true)} className="col-start-5 h-12 border rounded-full bg-purple text-white p-2 hover:bg-fuchsia-950">Edit</button>
                </>
            )}

            <button onClick={deleteCard} className="col-start-6 h-12 bg-purple text-white border-2 border-black rounded-full p-2 hover:bg-fuchsia-950">Delete</button>
        </div>
        </>

    );
}

export default CardComponent;