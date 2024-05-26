"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

type Category = {
  slug: string;
  name: string;
};

const fetchCategories = async () => {
  const { data } = await axios.get("https://dummyjson.com/products/categories");
  console.log("🚀 ~ fetchCategories ~ data:", data);
  return data;
};

const CategoryContainer = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
      {categories?.map((category: any) => {
        return (
          <a href={`/${category.slug}`} key={category.slug}>
            <CategoryCard
              imgLink="https://picsum.photos/200"
              title={category.name}
              price=""
              key=""
            />
          </a>
        );
      })}
    </div>
  );
};

export default CategoryContainer;
