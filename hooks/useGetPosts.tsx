import useSWR from "swr";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  content?: string;
  description: string;
  categoryId: number;
  createdAt: Date;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useGetPosts = ({ page }: { page: number }) => {
  const { data: post, error } = useSWR<Post[]>(
    `http://localhost:3000/posts?perPage=6&page=${page}`,
    fetcher
  );

  return {
    post,
    isLoading: !error && !post,
    isError: error,
  };
};

export default useGetPosts;
