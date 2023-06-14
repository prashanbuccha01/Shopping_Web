import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dynamic from "next/dynamic";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";

const Carousel = dynamic(
  () => import("react-responsive-carousel").then((module) => module.Carousel),
  {
    ssr: false,
  }
);

const HeroBanner = ({ carouselData = [] }) => {
  if (!carouselData || carouselData.length === 0) {
    return null; // Return null or show a loading state if data is not available
  }

  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {carouselData.map((item, index) => (
          <div key={index}>
            <img
              src={item.product_main_image}
              className="aspect-[4/3] md:aspect-auto object-cover h-[80vh]"
            />
            <Link href={`/category/${item.category}`}>
              <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                Shop now
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

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
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return {
      notFound: true,
    };
  }
}

export default HeroBanner;
