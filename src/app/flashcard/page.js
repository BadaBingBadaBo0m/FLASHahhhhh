"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore"; 
import { db } from "../firebase";

const FlashCardTest = () =>{
  const [cardSets, setCardSets] = useState([]);

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

  console.log(cardSets);

  return (
    <div className="w-[60%] m-auto pt-11">
      <h1> Hello</h1>
    </div>
  );
}

export default FlashCardTest;