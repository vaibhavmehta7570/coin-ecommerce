"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim() !== "") {
      window.location.href = `/search?find=${term}`;
    }
  };

  return (
    <div className="h-20 w-full p-10 top-0 flex justify-between items-center shadow-lg">
      <Link href="/">
        <span>Coinshift-Ecom</span>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2 border-black border-2 px-4 rounded-2xl w-[50%]"
      >
        <Input
          className="border-none focus:outline-none"
          style={{ caretColor: "transparent" }}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">
          <FaSearch className="pointer" />
        </button>
      </form>
      <div className="flex justify-center items-center gap-5">
        <FaShoppingCart className="h-6 w-6" />
        <MdAccountCircle className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Nav;
