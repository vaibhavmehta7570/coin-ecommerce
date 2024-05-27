"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/lib/CartStore";
import Link from "next/link";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto my-12 px-4 md:px-0 mt-28">
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="First Last" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@example.com" type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="123 Main St, Anytown USA" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="4111 1111 1111 1111"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger id="expiry-month">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent />
                </Select>
                <Select>
                  <SelectTrigger id="expiry-year">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" type="text" />
          </div>
          <Link href={"/checkout/thank-you"}>
            <Button className="w-full" type="submit">
              Place Order
            </Button>
          </Link>
        </form>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(totalPrice() + 5).toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-4">
            {cart.map((item) => {
              return (
                <div key={item.productId}>
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
