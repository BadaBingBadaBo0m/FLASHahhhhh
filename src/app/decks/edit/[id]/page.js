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
  const currentSet = doc(db, "Decks", deckId)

  const getOneDoc = async () => {
    const currentSetSnap = await getDoc(currentSet);
    console.log(currentSetSnap.data())
  }

  useEffect(() => {
    getOneDoc();
  }, []);
  

  return (
    <div className="flex h-full flex-col items-center justify-between p-24 ">
      <h1>Savior of the universe</h1>
    </div>
  );
}