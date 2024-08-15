"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase";

const FlashCardTest = () =>{
  const [cardSets, setCardSets] = useState([]);
  const [currentSetId, setCurrentSetId] = useState("HlwCElkzbESZb7g7JIwY");
  const currentSet = doc(db, "FlashCard-Set", currentSetId);

  useEffect(() => {
    const q = query(collection(db, "FlashCard-Set"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const setArr = [];
      querySnapshot.forEach((doc) => {
        setArr.push({ ...doc.data(), id: doc.id });
      });
      
      setCardSets(setArr);
    });
  }, []);

  // add card to database
  const [newCard, setNewCard] = useState({ question: "", answer: "" });

  const addCard = async (e) => {
    e.preventDefault();
    if (!newCard.question || !newCard.answer) return;
  
    const card = {
      question: newCard.question.trim(),
      answer: newCard.answer.trim(),
    };
    
    const currentSet = doc(db, "FlashCard-Set", currentSetId)
    const currentSetSnap = await getDoc(currentSet);

    await setDoc(currentSet, {
      Cards: [...currentSetSnap.data().Cards, card]
    })

    setNewCard({ question: "", answer: "" });
    }

    const getOneDoc = async () => {
      const currentSetSnap = await getDoc(currentSet);
      console.log(currentSetSnap.data())
    }

    getOneDoc();

  return (
    <div className="w-[60%] m-auto pt-11">
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
    </div>
  );
}

export default FlashCardTest;