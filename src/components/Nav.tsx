import React from "react";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";


type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="h-20 w-full p-10 top-0 flex justify-between items-center shadow-lg">
      <span>Coinshift-Ecom</span>
      <div className="flex items-center justify-center gap-2 border-black border-2 px-4 rounded-2xl w-[50%]">
        <Input className="border-none" />
        <FaSearch />
      </div>
      <div className="flex justify-center items-center gap-5">
        <FaShoppingCart className="h-6 w-6"/>
        <MdAccountCircle className="h-6 w-6"/>
      </div>
    </div>
  );
};

export default Nav;
