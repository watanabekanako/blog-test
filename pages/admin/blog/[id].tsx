import axios from "axios";
import { ReactEventHandler, useEffect, useState } from "react";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, TextField } from "@mui/material";
import { PrimaryButton } from "../../../components/elements/Button/Button";
import { useRouter } from "next/router";
import { Post } from "../../../types/type";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
type PostResponse = {
  post: {
    post: Post;
  };
};
const Post = ({ post }: PostResponse) => {
  const [onBlur, setOnBlur] = useState(false);
  const initialValues = { title: post.post.title, content: post.post.content };
  const [formValues, setFormValues] = useState<Post>(initialValues);
  const [title, setTitle] = useState(post.post.title);
  const [content, setContent] = useState(post.post.content);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (formValues.title && formValues.content !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formValues]);
  console.log(formValues, "form");
  const [formErrors, setFormErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (formValues.title === "") {
      setFormErrors(true);
      setErrorMessage("タイトルが入力されていません");
    } else {
      setFormErrors(false);
      setErrorMessage("");
    }
  }, [formValues]);
  const params = useRouter();
  const { id } = params.query;

  const validate = (values: any) => {
    const errors = { id: "1" };
    return errors;
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // e.preventDefault();

    if (formErrors === false) {
      await axios.put(`http://localhost:3000/posts/${id}`, formValues);
    }
  };
  // Date型へ変換し初期値に設定
  const [value, setValue] = React.useState<Date | null>(
    new Date(formValues.createdAt)
  );
  console.log(typeof formValues.createdAt, "normal");
  console.log(typeof value, "value");
  return (
    <>
      <Box sx={{ width: "1000px", m: "auto ", textAlign: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="作成日・更新日"
            // valueに渡ってくる値がDate型である必要がある
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <TextField
          sx={{ width: "80%" }}
          onBlur={() => setOnBlur(true)}
          value={formValues.title ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            // setFormValues({ ...formValues, title: event.target.value })
            setFormValues({ ...formValues, title: event.target.value })
          }
          error={formErrors}
          helperText={errorMessage}
        ></TextField>
        <TextField
          sx={{ width: "80%" }}
          onBlur={() => setOnBlur(true)}
          value={formValues?.content ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFormValues({ ...formValues, content: event.target.value })
          }
        ></TextField>
        {/* <PrimaryButton
            disabled={disabled}
            onClick={(event: any) => handleSubmit(event.target.value)}
          >
            登録する
          </PrimaryButton> */}
        <PrimaryButton
          onClick={(e: any) => handleSubmit(e)}
          // onClick={handleSubmit}
          disabled={disabled}
        >
          登録する
        </PrimaryButton>
      </Box>
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await axios.get(`http://localhost:3000/posts`);
//   const posts = response.data;

//   const paths = posts?.post?.map((post: any) => ({
//     params: { id: post.id.toString() },
//   }));
//   console.log(paths, "path");
//   return {
//     paths,
//     fallback: true,
//   };
// };
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(`http://localhost:3000/posts`);
  const posts = response.data;

  const paths = posts?.post?.map((post: any) => `/admin/blog/${post.id}`);
  console.log(paths, "path");
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { id } = params;
  const response = await axios.get(`http://localhost:3000/posts/${id}`);
  const post = response.data;

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};

export default Post;
