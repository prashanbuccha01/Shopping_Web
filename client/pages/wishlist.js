import React, { useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import WishList from "@/components/WishList";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Cart = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to the login page if token is not available
          router.push("/login");
          return;
        }

        // Make an API request to fetch the user data using the token
        // const response = await axios.get(
        //   "http://localhost:8000/api/private/userdata",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // setUser(response.data);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    };
  }, []);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {/* HEADING AND PARAGRAPH START */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            WishList
          </div>
        </div>
        {/* HEADING AND PARAGRAPH END */}

        {/* CART CONTENT START */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* WISHLIST ITEMS START */}
          <div className="flex-[2]">
            <div className="text-lg font-bold uppercase">WishList Items</div>
            <WishList />
            <WishList />
            <WishList />
            <WishList />
          </div>
          {/* WISHLIST CONTENT EMD */}
        </div>
        {/* WISHLIST CONTENT END */}

        {/* This is empty cart code */}
        {/* <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image
            src="/empty-cart.jpg"
            height={300}
            width={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold">Your card is empty</span>
          <span className="text-center mt-4">
            Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore.
          </span>
          <Link
            href="/"
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div> */}
      </Wrapper>
    </div>
  );
};

export default Cart;
