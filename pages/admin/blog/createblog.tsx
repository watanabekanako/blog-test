import { TextField } from "@mui/material";
import React, { useState } from "react";
import TitleInput from "../../../components/elements/Input/TitleInput";
import ContentInput from "../../../components/elements/Input/ContentInput";
const createBlog = () => {
  const [formValues, setFormValues] = useState({ title: "", content: "" });
  const [title, setTitle] = useState("");
  console.log(title);
  return (
    <>
      {/* <TitleInput title={title} setTitle={setTitle} /> */}
      <TitleInput title={formValues.title} setTitle={setTitle} />
    </>
  );
};

export default createBlog;
