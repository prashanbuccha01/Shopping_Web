import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import axios from "axios";

const ProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?id=${router.query._id}`
        );
        const products = response.data;
        if (products.length > 0) {
          setProduct(products[0]);
        } else {
          // Handle case when product is not found
          setProduct(null);
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    if (router.query._id) {
      fetchProduct();
    }
  }, [router.query._id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    actual_price,
    category,
    discount_percent,
    discounted_price,
    sizes,
    product_main_image,
    other_angle_product_images,
  } = product;

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={other_angle_product_images} />
          </div>
          {/* left column end  */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {title}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg font-semibold mb-5 uppercase">{category}</div>

            {/* Product Price  */}
            <div className="flex items-center">MRP: ₹ {discounted_price}</div>
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              (Also includes all applicable duties)
            </div>
            {/* PRODUCT SIZE RANGE START  */}
            <div className="mb-10">
              {/* HEADING START */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* HEADING END */}

              {/* SIZE START */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <div
                      key={size}
                      className={`border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer`}
                    >
                      {size}
                    </div>
                  ))
                ) : (
                  <div>No sizes available</div>
                )}
              </div>
              {/* SIZE END */}

              {/* SHOW ERROR START */}
              <div className="text-red-600 mt-1">
                Size selection is required
              </div>
              {/* SHOW ERROR END */}

              {/* ADD TO CART BUTTON START */}
              <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                Add to Cart
              </button>
              {/* ADD TO CART BUTTON END */}

              {/* ADD TO WISHLIST BUTTON START */}
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                Wishlist
                <IoMdHeartEmpty size={20} />
              </button>
              {/* ADD TO WISHLIST BUTTON ENDS */}

              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">{description}</div>
              </div>
            </div>
            {/* PRODUCT SIZE RANGE END  */}
          </div>
          {/* RIGHT COLUMN END */}
        </div>
        <RelatedProducts category={category} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
