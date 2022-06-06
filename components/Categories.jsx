import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { Jelly } from "@uiball/loaders";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
      setDataLoaded(true);
    });
  }, []);

  if (!dataLoaded)
    return (
      <div className="flex, w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="lightblue" />
      </div>
    );

  return (
    <div className="carrier shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl  font-semibold border-b pb-4 flex flex-col">
        Categories{" "}
      </h3>
      {dataLoaded &&
        categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="  cursor-pointer  pb-3 mb-3">
              {category.name} |{" "}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Categories;
