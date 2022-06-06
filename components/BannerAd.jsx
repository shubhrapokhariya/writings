import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getBannerPosts } from "../services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const BannerAd = () => {
  const [bannerAds, setBannerAds] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getBannerPosts().then((result) => {
      setBannerAds(result);
      setDataLoaded(true);
    });
  }, []);

  const customLeftArrow = (
    <div className=" flex absolute arrow-btn left-0   cursor-pointer bg-author  rounded-full  items-center justify-center">
      <ChevronDoubleLeftIcon className="   h-5 w-6  text-white " />
    </div>
  );

  const customRightArrow = (
    <div className=" flex absolute arrow-btn right-0   cursor-pointer bg-author  rounded-full  items-center justify-center">
      <ChevronDoubleRightIcon className="   h-5 w-6  text-white " />
    </div>
  );

  if (!dataLoaded)
    return (
      <div className="flex, w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="lightblue" />
      </div>
    );
  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded &&
          bannerAds.map((post, index) => (
            <div className="relative h-52" key={index}>
              <div
                className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-52"
                style={{ backgroundImage: `url('${post.photo.url}')` }}
              />
              <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-52" />
              <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
                <p className="text-black mb-4  font-semibold text-2xl text-center">
                  {post.name}
                </p>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default BannerAd;
