"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import useCartStore from "@/lib/CartStore";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = {};

const Nav = (props: Props) => {
  const [term, setTerm] = useState("");

  const addProduct = useCartStore((state) => state.addToCart);
  const removeProduct = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const totalProducts = useCartStore((state) => {
    let items = 0;
    state.cart.forEach((item) => {
      items += item.quantity;
    });
    return items;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term.trim() !== "") {
      window.location.href = `/search?find=${term}`;
    }
  };
  const calculateTotalPrice = (quantity: number, price: number) => {
    if (isNaN(price) || isNaN(quantity)) {
      console.error("Invalid price or quantity", { quantity, price });
      return "0.00";
    }
    return (quantity * price).toFixed(2);
  };

  const totalPrice = ()=>{
    let total = 0
    cart.forEach(item=>{
      total += (item.quantity * item.price)
    })
    console.log(total)
    return total
  }

  return (
    <div className="h-20 fixed z-10 bg-white w-full p-10 top-0 flex justify-between items-center shadow-lg">
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
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button variant="outline">
              <div className="relative">
                <FaShoppingCart className="h-6 w-6" />
                {totalProducts > 0 && (
                  <span className="absolute left-5 right-0 top-0 bg-orange-700 h-4 w-4 rounded-full text-white text-xs flex items-center justify-center">
                    {totalProducts}
                  </span>
                )}
              </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-2/5 h-screen right-0 left-auto">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
              <DrawerTitle className="text-lg font-semibold">Cart</DrawerTitle>
              <DrawerClose asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <span className="text-xl font-bold">X</span>
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid gap-4">
                {cart.length > 0 ? (
                  cart.map((items) => {
                    return (
                      <div
                        className="grid justify-items-center grid-cols-[auto_1fr_auto] items-center gap-4"
                        key={items.productId}
                      >
                        <div className="grid gap-1">
                          <h4 className="font-medium">{items.productName}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Quantity: {items.quantity}</span>
                            <span>·</span>
                            <span>{items.price}</span>
                          </div>
                        </div>
                        <div className="rounded-lg px-3 w-1/5 py-2 flex justify-around items-center border-2 border-black mx-3">
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              removeProduct(
                                items.productId,
                                items.productName,
                                items.price
                              )
                            }
                          >
                            -
                          </span>
                          <span className="font-semibold">
                            {items.quantity}
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              addProduct(
                                items.productId,
                                items.productName,
                                items.price
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                        <div className="text-right font-medium">
                          ${calculateTotalPrice(items.quantity, items.price)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3 className="text-center">
                    empty cart looks a bit off, shop and fill it up
                  </h3>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="font-medium">${totalPrice()}</span>
              </div>
              <div className="mt-4 grid gap-2">
                <Button size="lg">Checkout</Button>
                <Link href={"/"} className="w-full">
                  <DrawerClose className="w-full">
                    <Button size="lg" variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </DrawerClose>
                </Link>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <MdAccountCircle className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Nav;
