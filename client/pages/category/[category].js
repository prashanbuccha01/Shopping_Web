import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const Category = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { category } = router.query;
      setCategory(category);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?category=${category}`
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (router.query.category) {
      fetchProducts();
    }
  }, [router.query.category]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight uppercase bold">
            {category}s
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products.map((product) => (
            <React.Fragment key={product._id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Category;
