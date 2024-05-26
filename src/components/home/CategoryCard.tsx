import React from "react";

type CategoryCardProps = {
  imgLink: string;
  title: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ imgLink, title }) => {
  return (
    <div
      className="category-card shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      style={{ width: "300px", height: "290px" }}
    >
      <img src={imgLink} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="pl-4 w-full">
        <span className="text-blue-500 hover:text-blue-700">
          View All &rarr;
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
