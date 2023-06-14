import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";

const Menu = ({ showCatMenu, setShowCatMenu, setMobileMenu }) => {
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
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => (
        <React.Fragment key={item.id}>
          {!!item?.subMenu ? (
            <li
              className="cursor-pointer  flex items-center gap-2 relative"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
            >
              {item.name}
              <BsChevronDown />
              {showCatMenu && (
                <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                  {categories.map((category, index) => (
                    <Link
                      href={`/category/${category._id}`}
                      key={index}
                      onClick={() => {
                        setShowCatMenu(false);
                        setMobileMenu(false); // Call setMobileMenu here
                      }}
                    >
                      <li
                        className="py-4 px-8 border-t flex justify-between"
                        passhref={true}
                      >
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
            <li className="cursor-pointer">
              <Link href={item?.url}>{item.name}</Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Menu;
