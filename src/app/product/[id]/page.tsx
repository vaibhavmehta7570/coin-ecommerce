"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useCartStore from "@/lib/CartStore";

export default function ProductPage() {
  const params = useParams<{ id: string }>();

  const addProduct = useCartStore((state) => state.addToCart);
  const removeProduct = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const existingItem = cart.find((item) => {
    if (item.productId == params.id) {
      return item;
    }
  });

  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null); // State to hold the current thumbnail image URL

  const fetchProduct = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/${params.id}`
    );
    return response.data;
  };

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search"],
    queryFn: fetchProduct,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleThumbnailClick = (image: string) => {
    setThumbnailImage(image); // Update the thumbnail image state when an image is clicked
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 mt-20">
      <div className="grid gap-4">
        <img
          alt="Product Image"
          className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          height={900}
          src={thumbnailImage || (product?.images[0] ?? "")} // Use the current thumbnail image URL if available, otherwise fallback to the first image in the array
          width={600}
        />
        <div className="hidden md:grid grid-cols-5 gap-3 justify-items-center w-full">
          {product?.images.map((img, index) => {
            return (
              <button
                className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
                key={index}
                onClick={() => handleThumbnailClick(img)} // Call handleThumbnailClick function on image click
              >
                <img
                  alt="Preview thumbnail"
                  className="aspect-[5/6] object-cover"
                  height={120}
                  src={img}
                  width={100}
                />
                <span className="sr-only">View Image 1</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-4 md:gap-10">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product?.title}</h1>
          <div>
            <p>{product?.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {/* <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              ({product?.reviews.length} reviews)
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">${product?.price}</h2>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {existingItem?.quantity ? (
              <div className="rounded-lg w-2/5 flex justify-around items-center border-2 border-black ">
                <span
                  className="cursor-pointer p-2"
                  onClick={() =>
                    removeProduct(
                      product.id,
                      product.productName,
                      product.price
                    )
                  }
                >
                  -
                </span>
                <span className="font-semibold">{existingItem.quantity}</span>
                <span
                  className="cursor-pointer p-2"
                  onClick={() =>
                    addProduct(product.id, product.productName, product.price)
                  }
                >
                  +
                </span>
              </div>
            ) : (
              <Button
                variant={"default"}
                className="w-2/5"
                onClick={() => {
                  addProduct(product.id, product.productName, product.price);
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="grid gap-6">
          <h2 className="font-bold text-2xl">Reviews</h2>
          <div className="grid gap-6">
            {product?.reviews.map((review, index) => (
              <div className="flex gap-4" key={index}>
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt={review.author} src={review.avatar} />
                  <AvatarFallback>
                    {review?.author?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="grid gap-0.5 text-sm">
                      <h3 className="font-semibold">{review.reviewerName}</h3>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </time>
                    </div>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {/* Render star icons or rating here */}
                    </div>
                  </div>
                  <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
