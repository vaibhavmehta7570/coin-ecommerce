import React from "react";

type CategoryCardProps = {
  imgLink: string;
  title: string;
  price: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  imgLink,
  title,
  price,
}) => {
  return (
    <div
      className="category-card shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      style={{ width: "300px", height: "300px" }}
    >
      <img src={imgLink} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">{price}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
