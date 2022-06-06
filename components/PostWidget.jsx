import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getRelatedPosts } from "../services";
import { Jelly } from "@uiball/loaders";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
        setDataLoaded(true);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
        setDataLoaded(true);
      });
    }
  }, [slug]);

  if (!dataLoaded)
    return (
      <div className="flex, w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="lightblue" />
      </div>
    );

  return (
    <div className="carrier shadow-lg rounded-lg px-8 pt-8 mb-8">
      <h3 className="text-lg mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
        {dataLoaded &&
          relatedPosts.map((post) => (
            <div key={post.title} className="flex items-center w-full my-3">
              <div className="w-16 flex-none">
                <img
                  alt={post.title}
                  height="60px"
                  width="60px"
                  className="align-middle rounded-full"
                  src={post.featuredImage.url}
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-400  text-sm font-semibold">
                  {moment(post.createdAt).format(" D MMM YYYY")}
                </p>
                <Link
                  href={`/post/${post.slug}`}
                  className="text-md"
                  key={post.title}
                >
                  {post.title}
                </Link>
              </div>
            </div>
          ))}
      </h3>
    </div>
  );
};

export default PostWidget;
