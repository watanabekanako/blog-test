import { InputProps, TextField } from "@mui/material";
import React, { Dispatch } from "react";
type Props = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const ContentInput = ({ content, setContent }: Props) => {
  return (
    <TextField
      variant="outlined"
      value={content || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
        setContent(e.target.value)
      }
    />
  );
};

export default ContentInput;
