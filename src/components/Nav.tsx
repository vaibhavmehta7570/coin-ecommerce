"use client";
import React, { useState, useEffect, Suspense } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AuthModal from "./AuthModal";
import useAuthStore from "@/lib/auth/AuthStore";
import { useRouter } from "next/navigation";
import { Logout } from "@/lib/auth/Auth";
import AddToCart from "./AddToCart";

type Props = {};

const Nav = (props: Props) => {
  const [term, setTerm] = useState("");
  const { authh, setAuthh } = useAuthStore();
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const router = useRouter();
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

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setAuthh(true);
      setProfileImage(parsedAuthData.imgLink);
      if (parsedAuthData.firstName) {
        setFirstName(parsedAuthData.firstName);
      }
    } else {
      setAuthh(false);
    }
  }, [setAuthh]);

  const handleLogout = async () => {
    try {
      await Logout();
      //show sucesstoast
      setAuthh(false);
      setProfileImage("");
      router.push("/");
    } catch (error) {
      //show error toast
    }
  };

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
          placeholder="Enter Product Name..."
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
                  cart.map((items) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={items.productId}
                    >
                      <div className="truncate max-w-xs">
                        <h4
                          className="font-medium truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          {items.productName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>Quantity: {items.quantity}</span>
                          <span>·</span>
                          <span>{items.price}</span>
                        </div>
                      </div>
                      <div className="flex-grow flex justify-center">
                        <AddToCart
                          items={items}
                          removeFunc={removeProduct}
                          addFunc={addProduct}
                        />
                      </div>
                      <div className="text-right font-medium">
                        ${calculateTotalPrice(items.quantity, items.price)}
                      </div>
                    </div>
                  ))
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
                {authh ? (
                  <Link href={"/checkout"} className="w-full">
                    <DrawerClose className="w-full">
                      <Button size="lg" className="w-full">
                        Checkout
                      </Button>
                    </DrawerClose>
                  </Link>
                ) : (
                  <AuthModal>
                    <Button className="outline w-full">Checkout</Button>
                  </AuthModal>
                )}
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

        <Popover>
          <PopoverTrigger>
            {authh ? (
              <img
                src={profileImage}
                alt="profile"
                className="h-6 w-6 rounded-3xl"
              />
            ) : (
              <MdAccountCircle className="h-6 w-6" />
            )}
          </PopoverTrigger>
          <PopoverContent className="flex justify-center w-fit">
            {authh ? (
              <div className="flex flex-col gap-2 justify-center">
                <div> welcome, {firstName}</div>
                <Button onClick={handleLogout}>Log Out</Button>
              </div>
            ) : (
              <AuthModal>
                <Button className="outline">Sign In</Button>
              </AuthModal>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Nav;
