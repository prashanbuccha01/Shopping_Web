import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const WishList = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="product-1.webp" alt="" />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Jordan Retro 6 G
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            Men&apos;s Golf Shoes
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377; 19 695.00
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          Men&apos;s Golf Shoes
        </div>

        <div className="flex items-center justify-between mt-3">
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
          {/* BUTTON START */}
          <button className="p-[8px] rounded-full bg-black text-white transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center">
            Add to Cart
          </button>
          {/* BUTTON END */}
        </div>
      </div>
    </div>
  );
};

export default WishList;
