import useSWR from "swr";
import axios from "axios";

type Post = {
  post: {
    id: number;
    title: string;
    content?: string;
    description: string;
    categoryId: number;
    createdAt: Date;
  }[];
  totalCount: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useGetPosts = ({ page }: { page: number }) => {
  const { data: post, error } = useSWR<Post>(
    `http://localhost:3000/posts?page=${page}`,
    fetcher
  );

  if (!post?.post || post.post.length < 1) {
    return {
      isLoading: true,
      isError: false,
    };
  }

  return {
    post,
    isLoading: !error && !post,
    isError: error,
  };
};

export default useGetPosts;
