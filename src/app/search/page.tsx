"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "@/components/home/CategoryCard";
import Link from "next/link";

const Page = () => {
  const [page, setPage] = useState(1); // Track the current page
  const [products, setProducts] = useState([]); // Store the fetched products
  const [hasMore, setHasMore] = useState(true); // Track if there are more products to load
  const searchParams = useSearchParams();
  const search = searchParams.get("find");

  const fetchSearches = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${search}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    data: find,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search"],
    queryFn: fetchSearches,
  });

  useEffect(() => {
    if (!isLoading && find) {
      setProducts((prevProducts) => [...prevProducts, ...find.products]);
      setHasMore(find.products.length > 0); // Check if there are more products to load
    }
  }, [find, isLoading]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full items-center p-10 flex-col">
      {!isLoading && find && <h1>Searching For {search}</h1>}
      <div className="w-full flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            {/* Use <Link> instead of <a> */}
            <div className="flex w-full gap-5 p-10 h-full justify-center overflow-auto">
              <CategoryCard
                imgLink={product.thumbnail}
                title={product.title}
                price={`$${product.price}`}
              />
            </div>
          </Link>
        ))}
        {!isLoading && !hasMore && (
          <div className="w-full text-center">No more results found</div>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
      {hasMore && (
        <div className="w-full text-center">
          <button onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : ""}
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
