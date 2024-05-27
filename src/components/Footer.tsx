"use client"
import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-100 py-12 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Coin Ecommerce</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link className="text-sm font-medium hover:underline" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Shop
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#">
            Contact
          </Link>
        </nav>
        <div className="w-full max-w-md">
          <form className="flex items-center space-x-2">
            <Input className="flex-1" placeholder="Enter your email" type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Sign up for our newsletter to stay up-to-date on new products and sales.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
