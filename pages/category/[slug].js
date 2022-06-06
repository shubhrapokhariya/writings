import React from "react";
import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories } from "../../components";
import { useRouter } from "next/router";
import { Jelly } from "@uiball/loaders";

const SingleCategoryPage = ({ posts }) => {
  const router = useRouter();
  if (router.fallback) {
    <div className="flex, w-full items-center justify-center p-10 text-xl">
      <Jelly size={50} color="lightblue" />
    </div>;
  }
  return (
    <>
      {!posts ? (
        <div className="p-10 ">
          <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center space-x-4 bg-purple-50 pb-3 text-xl">
            <div className="-mt-20 pl-10">
              <p className="pb-10 text-4xl font-extrabold text-blue-500">404</p>
              <p className="italic">Oops! </p>
              <p className="italic">Looks like the page is gone...</p>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/3687957/pexels-photo-3687957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
              {posts.map((post, index) => (
                <PostCard key={index} post={post.node} />
              ))}
            </div>
            <div className="col-span-1 lg:col-span-4">
              <div className="relative lg:sticky top-8">
                <Categories />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCategoryPage;

export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
