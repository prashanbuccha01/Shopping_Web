import React, { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

export default function Home({ carouselData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCategoryProducts = (categoryName) => {
    return products
      .filter((product) => product.category === categoryName)
      .slice(0, 3);
  };

  return (
    <main>
      <HeroBanner carouselData={carouselData} />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {getCategoryProducts("saree").map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {getCategoryProducts("t-shirt").map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {getCategoryProducts("shirt").map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/products?isCarousel=true"
    );
    const carouselData = response.data;

    return {
      props: {
        carouselData,
      },
      revalidate: 60, // Re-generate this page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return {
      notFound: true,
    };
  }
}
