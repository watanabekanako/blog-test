import axios from "axios";
import React, { useEffect } from "react";

const useGetCategories = () => {
  const [categories, setCategories] = React.useState();
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3000/posts/categories")
  //       .then((response) => setCategories(response.data));
  //   }, []);
  //   return { categories };
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get("http://localhost:3000/posts/categories")
        .then((response) => {
          setCategories(response.data);
        });
    };
    getCategory();
  }, []);

  return { categories };
};

export default useGetCategories;
// const useGetCategories = () => {
//   const [categories, setCategories] = React.useState([]);

//   React.useEffect(() => {
//     axios
//       .get("http://localhost:3000/posts/categories")
//       .then((response) => setCategories(response.data));
//   }, []);

//   return { categories };
// };

// export default useGetCategories;
