import React from "react";
import { Button } from "../ui/button";
import useCartStore from "@/lib/CartStore";
import Link from "next/link";

type ProductCardProps = {
  imgLink: string;
  title: string;
  price: string;
  productId: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  imgLink,
  title,
  price,
  productId,
}) => {
  const addProduct = useCartStore((state) => state.addToCart);
  const removeProduct = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const existingItem = cart.find((item) => {
    if (parseInt(item.productId) === productId) {
      return item;
    }
  });

  return (
    <div className="category-card w-[300px] min-h-[420px] max-h-[420px] shadow-lg rounded-lg overflow-hidden container mx-auto transition-transform transform hover:scale-105">
      <Link href={`/product/${productId}`}>
        <img src={imgLink} alt={title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">{price}</p>
      </div>
      {existingItem?.quantity ? (
        <div className="rounded-lg flex justify-around items-center border-2 border-black w-4/5 fixed bottom-5">
          <span
            className="cursor-pointer p-2"
            onClick={() =>
              removeProduct(
                productId,
                title,
                parseFloat(price.replace("$", ""))
              )
            }
          >
            -
          </span>
          <span className="font-semibold">{existingItem.quantity}</span>
          <span
            className="cursor-pointer p-2"
            onClick={() =>
              addProduct(productId, title, parseFloat(price.replace("$", "")))
            }
          >
            +
          </span>
        </div>
      ) : (
        <Button
          variant={"default"}
          className="mx-auto w-4/5 fixed bottom-5"
          onClick={() =>
            addProduct(productId, title, parseFloat(price.replace("$", "")))
          }
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
