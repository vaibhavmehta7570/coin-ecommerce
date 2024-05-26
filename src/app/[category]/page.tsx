"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "@/components/home/CategoryCard";
import Link from "next/link";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams<{ category: string }>();

  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${params.category}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    data: categoryProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["category", params.category],
    queryFn: fetchCategoryProducts,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full items-center p-10 flex-col">
      <h1>Category: {params.category}</h1>
      <div className="w-full flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
        {isLoading && <div>Loading...</div>}
        {categoryProducts &&
          categoryProducts.products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="flex w-full gap-5 p-10 h-full justify-center overflow-auto">
                <CategoryCard
                  imgLink={product.thumbnail}
                  title={product.title}
                  price={`$${product.price}`}
                />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
