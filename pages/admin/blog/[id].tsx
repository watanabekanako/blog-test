import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultLayout from "../../../components/layout/defaultLayout";
import { PostAddSharp } from "@mui/icons-material";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

const Post = ({ post }: any) => {
  console.log(post, "post");
  return (
    <>
      <DefaultLayout>{post && post.post.title}</DefaultLayout>
      {/* <DefaultLayout>{ post?.post?.title}</DefaultLayout> */}
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await axios.get(`http://localhost:3000/posts`);
//   const posts = response.data;

//   const paths = posts?.post?.map((post: any) => ({
//     params: { id: post.id.toString() },
//   }));
//   console.log(paths, "path");
//   return {
//     paths,
//     fallback: true,
//   };
// };
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://localhost:3000/posts`);
  const posts = response.data;

  const paths = posts?.post?.map((post: any) => `/admin/blog/${post.id}`);
  console.log(paths, "path");
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { id } = params;

  const response = await axios.get(`http://localhost:3000/posts/${id}`);
  const post = response.data;

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export default Post;
