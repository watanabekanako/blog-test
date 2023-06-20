import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";

//   const fetcher = (url: string) =>
//     axios.get(url).then((response) => response.data);
//   const { data, error } = useSWR(
//     `http://localhost:3000/posts?category=${49}`,
//     fetcher
//   );

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const useGetSelectedPost = ({ categoryId }: any) => {
  const { data: category, error } = useSWR<any>(
    `http://localhost:3000/posts?category=${categoryId}`,
    fetcher
  );

  return {
    category,
    isLoading: !error && !category,
    isError: error,
  };
};

export default useGetSelectedPost;
