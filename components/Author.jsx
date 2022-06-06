import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className=" sm:flex  my-8   p-4 items-center  text-center  relative rounded-lg   bg-author">
      <div>
        <Image
          alt={author.name}
          unoptimized
          height="100px"
          width="100px"
          className="align-middle rounded-full"
          src={author.photo.url}
        />

        <h3 className="text-gray-400  text-xl font-bold">{author.name}</h3>
      </div>
      <p className="text-white text-md mx-5">{author.bio}</p>
    </div>
  );
};

export default Author;
