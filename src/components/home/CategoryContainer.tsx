"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import Link from "next/link";


type Category = {
  slug: string;
  name: string;
};

const fetchCategories = async () => {
  const { data } = await axios.get("https://dummyjson.com/products/categories");

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

  if (isLoading) return <p className="pl-10">Loading categories...</p>;

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-wrap gap-5 p-10 h-full justify-center overflow-auto">
      {categories?.map((category: any) => {
        return (
          <Link href={`/${category.slug}`} key={category.slug}>
            <CategoryCard
              imgLink="https://picsum.photos/250"
              title={category.name}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryContainer;
