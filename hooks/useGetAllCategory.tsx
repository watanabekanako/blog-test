import axios from "axios";
import React, { useEffect, useState } from "react";
type Category = {
  categories: {
    id: number;
    name: string;
  }[];
};
const useGetAllCategory = () => {
  //   const [allCategories, setAllCategories] = useState<Category[]>([]);
  //   const [allCategories, setAllCategories] = useState<Category>();
  const [allCategories, setAllCategories] = useState();
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/categories`
        );
        setAllCategories(response.data);
      } catch (error) {}
    };
    fetchDate();
  }, []);
  return { allCategories };
};

export default useGetAllCategory;
