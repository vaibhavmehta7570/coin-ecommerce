"use client";
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/Types";

const Page = () => {
  const [page, setPage] = useState(0); // Track the current page
  const searchParams = useSearchParams();
  const search = searchParams.get("find");

  const fetchSearches = async (page = 0) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${search}&limit=8&skip=${
          page * 8
        }`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    data: result,
    error,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["search", page],
    queryFn: () => fetchSearches(page),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Suspense>
      <div className="flex w-full h-screen items-center p-10 flex-col mt-20">
        {!isLoading && <h1>Searching For {search}</h1>}
        <div className="w-full flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
          {!isLoading && result?.products.length === 0 ? (
            <div className="text-center">
              <h2>No results found for {search}</h2>
            </div>
          ) : (
            result?.products.map((product: Product) => (
              <div
                className="flex gap-5 p-10 justify-center overflow-auto"
                key={product.id}
              >
                <ProductCard
                  imgLink={product?.thumbnail}
                  title={product?.title}
                  price={`$${product.price}`}
                  productId={product.id}
                />
              </div>
            ))
          )}
        </div>

        {result?.products.length > 0 && (
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
                if (!isPlaceholderData && result.total) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={result?.limit < 8}
            >
              Next Page
            </Button>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Page;
