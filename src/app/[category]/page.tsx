"use client";
import React, { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import ProductCard from "@/components/home/ProductCard";

const CategoryPage = () => {
  const params = useParams<{ category: string }>();
  const [page, setPage] = React.useState(0);

  const fetchCategoryProducts = async (page = 0) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${
          params.category
        }/?limit=8&skip=${page * 8}`
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
    isError,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: [params.category, page],
    queryFn: () => fetchCategoryProducts(page),
    placeholderData: keepPreviousData,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full h-screen items-center p-10 flex-col">
      <h1>Category: {params.category}</h1>
      <div className="w-full flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
        {isLoading && <div>Loading...</div>}
        {categoryProducts &&
          categoryProducts.products.map((product) => (
            <div
              className="flex gap-5 p-10 justify-center overflow-auto"
              key={product.id}
            >
              <ProductCard
                imgLink={product.thumbnail}
                title={product.title}
                price={`$${product.price}`}
                productId={product.id}
              />
            </div>
          ))}
      </div>
      <div className="flex gap-5 bottom-0 pt-5 shadow-inner p-2 w-full justify-center">
        <Button
          variant={"outline"}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </Button>
        <Button variant={"outline"}> {page + 1}</Button>
        <Button
          variant={"outline"}
          onClick={() => {
            if (!isPlaceholderData && categoryProducts.total) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={categoryProducts?.limit < 8}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
