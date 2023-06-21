import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TitleInput from "../../../components/elements/Input/TitleInput";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { PrimaryButton } from "../../../components/elements/Button/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Post } from "../../../types/type";
import useGetPosts from "../../../hooks/useGetPosts";
import useGetCategories from "../../../hooks/useGetCategories";
import axios from "axios";
const createBlog = () => {
  const [formErrors, setFormErrors] = useState(false);
  const { post } = useGetPosts({ page: 1 });
  const { categories } = useGetCategories();
  console.log(categories, "categoryhook");
  const [title, setTitle] = useState("");
  const [value, setValue] = React.useState<Date | null>(new Date());
  const inputEl = useRef(null);
  const handleSubmit = () => {
    axios.post("http://localhost:3000/posts", { title: title, categoryId: 6 });
  };
  console.log(title, "title");
  // const InputText = () => {
  //   console.log(input.current.value);
  // };
  const inputRef = useRef(null);

  return (
    <>
      <Box sx={{ width: "1000px", m: "auto ", textAlign: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="作成日"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <TextField
          ref={inputEl}
          sx={{ display: "flex", mb: 6 }}
          // onBlur={() => setOnBlur(true)}
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          error={formErrors}
          // helperText={errorMessage}
        ></TextField>
        {/* <TextField
          sx={{ display: "flex", mb: 6 }}
          label={"内容"}
          // onBlur={() => setOnBlur(true)}
          value={formValues?.content ?? ""}
          multiline
          rows={10}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFormValues({ ...formValues, content: event.target.value })
          }
        ></TextField> */}
        {/* <TextField
          sx={{ display: "flex", mb: 6 }}
          label={"内容"}
          onBlur={() => setOnBlur(true)}
          value={formValues.categoryId ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFormValues({
              ...formValues,
              categoryId: Number(event.target.value),
            })
          }
          multiline
          rows={10}
        ></TextField> */}
        <Box sx={{ textAlign: "center" }}>
          <PrimaryButton onClick={handleSubmit}>登録する</PrimaryButton>
        </Box>
      </Box>
    </>
  );
};

export default createBlog;
