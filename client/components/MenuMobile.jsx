import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";

const MenuMobile = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const data = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "About",
      url: "/about",
    },
    {
      id: 3,
      name: "Categories",
      subMenu: true,
    },
    {
      id: 4,
      name: "Contact",
      url: "/contact",
    },
  ];

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {!!item?.subMenu ? (
            <li
              className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <div className="flex justify-between items-center">
                {item.name}
                <BsChevronDown />
              </div>
              {showCatMenu && (
                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                  {categories.map((category, index) => (
                    <Link
                      href={`/category/${category._id}`}
                      key={index}
                      onClick={() => {
                        setShowCatMenu(false);
                        setMobileMenu(false);
                      }}
                    >
                      <li className="py-4 px-8 border-t flex justify-between">
                        {category._id}
                        <span className="opacity-50 text-sm">
                          {category.count}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="py-4 px-5 border-b">
              <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                {item.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MenuMobile;
