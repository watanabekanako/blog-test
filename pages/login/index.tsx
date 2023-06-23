import { TextField } from "@mui/material";
import React from "react";
import { PrimaryButton } from "../../components/elements/Button/Button";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const onLoinButton = () => {
    if (email.length < 1) {
      setFormError(true);
      setMessage("〇〇以上入力してください");
    }
    axios.post("http://localhost:3000/user", {
      email: email,
      password: password,
      name: name,
    });
  };
  const [formError, setFormError] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>();
  return (
    <>
      <TextField
        sx={{ display: "flex" }}
        value={email}
        helperText={message}
        error={formError}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        sx={{ display: "flex" }}
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <TextField
        sx={{ display: "flex" }}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <PrimaryButton
        children={"ログインする"}
        onClick={onLoinButton}
        disabled={false}
      />
    </>
  );
};

export default Login;
