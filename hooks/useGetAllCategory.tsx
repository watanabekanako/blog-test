import axios from "axios";
import React, { useEffect, useState } from "react";
import { Category } from "../types/type";
// Categoryの配列
type Categories = Category[];
// apiからのレスポンスの形
type CategoryResponse = { categories: Categories };
const useGetAllCategory = () => {
  const [allCategories, setAllCategories] = useState<CategoryResponse>();

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
