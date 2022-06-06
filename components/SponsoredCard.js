import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getFeaturedPosts } from "../services";
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
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
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

const SponsoredCard = () => {
  const [bannerAds, setBannerAds] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
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
            <div className="relative h-72" key={index}>
              <div
                className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
                style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
              />
              <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
              <p className=" mb-4  font-semibold text-xs text-white bg-author p-2 rounded-md text-center">
                Sponsored
              </p>
              <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
                <p className="text-gray-300 mb-4 text-shadow font-semibold text-xs">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="text-white mb-4 text-shadow font-semibold text-xl text-center">
                  {post.title}
                </p>
                <div className="flex items-center absolute bottom-5 w-full justify-center">
                  <Image
                    unoptimized
                    alt={post.author.name}
                    height="30px"
                    width="30px"
                    className="align-middle drop-shadow-lg rounded-full"
                    src={post.author.photo.url}
                  />
                  <p className="inline align-middle text-white text-shadow ml-2 font-medium">
                    {post.author.name}
                  </p>
                </div>
              </div>
              <Link href={`/post/${post.slug}`}>
                <span className="cursor-pointer absolute w-full h-full" />
              </Link>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default SponsoredCard;
