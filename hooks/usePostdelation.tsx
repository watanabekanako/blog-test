import { useState } from "react";
import React from "react";
import axios from "axios";
export const usePostDeletion = (url: any) => {
  // State for tracking loading and error status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to delete a post
  const deletePost = () => {
    setLoading(true);
    setError(null);

    axios
      .delete(url)
      .then(() => {
        //         refetch();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Return the necessary values and functions
  return { loading, error, deletePost };
};
