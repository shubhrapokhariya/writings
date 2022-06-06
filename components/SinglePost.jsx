import React from "react";
import moment from "moment";
import { CalendarIcon } from "@heroicons/react/outline";
import Image from "next/image";

const SinglePost = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="carrier shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6 ">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg "
        />
      </div>
      <div className="px-4 lg:px-0">
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

        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default SinglePost;
