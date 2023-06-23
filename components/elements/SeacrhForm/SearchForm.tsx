import { Box, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { PrimaryButton } from "../Button/Button";
import axios from "axios";
import router from "next/router";
type Props = {
  setPosts: any;
};
const SearchForm = ({ setPosts }: Props) => {
  const [searchWord, setSearchWord] = useState<string>();
  const handleSearch = async () => {
    try {
      await router.push(`?key=${searchWord}`);
      const response = await axios.get(
        `http://localhost:3000/posts?key=${searchWord}`
      );
      setPosts(response.data.post);
      setSearchWord("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          value={searchWord}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.target.value)
          }
          placeholder="検索したいワードを入力してください"
          sx={{ mx: 2 }}
        />
        <PrimaryButton
          children={"検索する"}
          onClick={handleSearch}
          sx={{ my: 2 }}
        />
      </Box>
    </>
  );
};

export default SearchForm;
