"use client"

import Image from "next/image";
import { runGemini } from "./gemini";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-between p-24 ">
      <h1>FLASH ahhhhhh</h1>

      <button onClick={() => runGemini("Hello")}>print</button>
    </div>
  );
}
