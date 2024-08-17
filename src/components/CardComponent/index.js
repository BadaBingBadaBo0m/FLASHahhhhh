"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, orderBy, doc, setDoc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "../../app/firebase";

const CardComponent= ({card}) =>{


  return (
    <div className="text-lg grid grid-cols-6 grid-rows-1 gap-4 w-full p-3 my-5  ">
        <div className="col-span-2 border p-2 ">{card.question}</div>
        <div className="col-span-2 col-start-3 border p-2">{card.answer}</div>
        <button className="col-start-5 border rounded-full p-2">Edit</button>
        <button className="col-start-6 border rounded-full p-2">Delete</button>
    </div>
  );
}

export default CardComponent;