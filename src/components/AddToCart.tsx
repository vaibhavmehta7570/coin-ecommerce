import React from "react";

type Props = {
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  };
  addFunc: Function;
  removeFunc: Function;
  style?: string;
};

const AddToCart = ({ items, addFunc, removeFunc, style }: Props) => {
  return (
    <div
      className={`${style} flex justify-between items-center w-32 border-2 border-black rounded-lg px-3 py-2 mx-3`}
    >
      <span
        className="cursor-pointer"
        onClick={() =>
          removeFunc(items.productId, items.productName, items.price)
        }
      >
        -
      </span>
      <span className="font-semibold">{items.quantity}</span>
      <span
        className="cursor-pointer"
        onClick={() => addFunc(items.productId, items.productName, items.price)}
      >
        +
      </span>
    </div>
  );
};

export default AddToCart;
