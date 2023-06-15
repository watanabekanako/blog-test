import axios from "axios";
import React, { useEffect, useState } from "react";
type Post = {
  post: [
    {
      id: number;
      title: string;
      content?: string;
      description: string;
      categoryId: number;
      createdAt: Date;
    }
  ];
};

const useGetPosts = ({ page }: any) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts?perPage=6&page=${page}`)
      .then((response) => {
        setPost(response.data);
      });
  }, [page]);
  return { post };
};

export default useGetPosts;
