import React, { useState, useEffect } from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    product_main_image,
    actual_price,
    discount_percent,
    discounted_price,
  } = product;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    );
  }

  return (
    <Link
      href={`/product/${_id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <div className="aspect-w-1 aspect-h-1">
        <img
          className="object-cover w-full h-[60vh]"
          src={product_main_image}
          alt="Product Image"
          passhref={true}
        />
      </div>
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">₹{discounted_price}</p>
          <p className="text-base font-medium line-through">₹{actual_price}</p>
          <p className="ml-auto text-base font-medium text-green-500">
            {discount_percent}% off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
