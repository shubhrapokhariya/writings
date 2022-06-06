import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";

const PostCard = ({ post }) => {
  return (
    <div className="carrier  shadow-lg rounded-lg p-0  lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80  mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1 className="transition duration-500 text-center mb-8 cursor-pointer hover:text-blue-500 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="md:flex  mb-8 w-full px-3">
        <div className=" flex  items-center  text-center  justify-center">
          <div className="relative h-20  w-20  flex-shrink-0 cursor-pointer rounded-full  bg-gray-400 ">
            <Image
              alt={post.author.name}
              layout="fill"
              objectFit="contain"
              className="align-middle rounded-full  "
              src={post.author.photo.url}
            />
          </div>

          <p className="text-gray-400 ml-2 text-lg font-semibold  ">
            {post.author.name}
          </p>
        </div>
        <div className="md:flex-1"></div>
        <div className="font-medium text-gray-700 flex  text-center items-center justify-center pt-4 md:pt-0">
          <CalendarIcon className="h-7 w-8  rounded-md lg:p-1  text-blue-400" />
          <span className="text-gray-400  text-md font-semibold">
            {moment(post.createdAt).format(" D MMM YYYY")}
          </span>
        </div>
      </div>
      <p className="px-4   text-lg text-gray-700 font-normal lg:px-15 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center px-3">
        <Link href={`/post/${post.slug}`}>
          <div className="flex text-center text-gray-700 font-semibold items-center justify-center transition duration-500 transform hover:-translate-y-1  bg-blue-400 p-2 border rounded-md hover:bg-gray-400 cursor-pointer">
            <span className="mr-2">Continue Reading </span>
            <ChevronDoubleRightIcon className=" text-gray-700  h-5 w-5 " />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
