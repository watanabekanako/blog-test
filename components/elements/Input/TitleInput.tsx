import { InputProps, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
type Props = {
  title: string;
  // setTitle: (e: any) => void;
  setTitle: Dispatch<SetStateAction<string>>;
};

const TitleInput = ({ title, setTitle }: Props) => {
  return (
    <TextField
      variant="outlined"
      value={title || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
      }
      // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      //   setTitle(e.target.value)
      // }
    />
  );
};

export default TitleInput;
