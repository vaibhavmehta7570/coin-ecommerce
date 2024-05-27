"use client"; // Mark the component as client-side

import React from "react";
import Slider from "@/components/Slider";
import CategoryContainer from "@/components/home/CategoryContainer";

const images = [
  { src: "/b1.jpeg", alt: "Image 1", width: "500", height: "200" },
  { src: "/b2.jpeg", alt: "Image 2", width: "500", height: "200" },
  { src: "/b3.jpeg", alt: "Image 2", width: "500", height: "200" },
  { src: "/b4.jpeg", alt: "Image 2", width: "500", height: "200" },
];

export default function Home() {
  return (
    <div className="flex mt-20 flex-col min-h-screen">
      <div className="flex justify-center items-center w-full h-[40%] border-b-2 border-black">
        <Slider images={images} />
      </div>
      <h2 className="p-10 font-semibold text-2xl">
        Find the best of all categories
      </h2>
      <CategoryContainer />
    </div>
  );
}
