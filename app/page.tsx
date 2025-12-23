"use client";

import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";

// Small list of words we combine with a short nanoid to produce a friendly
// ephemeral username (e.g. "anonymous-wolf-abc12"). Keeping it short is
// helpful for display and for not leaking identifying info.
const ANIMALS = ["wolf", "hawk", "bear", "shark"];

// Key used to persist the generated username in localStorage so it's stable
// across page reloads on the same browser.
const STORAGE_KEY = "chat_username";

// Create a random, human-friendly username by picking an animal and adding
// a short unique suffix from `nanoid`.
const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

const Page = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // On mount, try to read an existing username from localStorage. If none
    // exists, generate a new one, persist it, and update component state.
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUsername(stored);
        return;
      }
      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    };

    main();
  }, []); // empty deps => run once on component mount

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                {/* Visual container for the username; uses a monospace font */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>
            <button className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50">
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
