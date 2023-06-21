import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
type Props = {
  children: string;
  // onClick: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  sx?: any;
};
const PrimaryButton = ({
  children,
  onClick,
  disabled,
  sx,
  ...props
}: Props) => {
  return (
    <>
      <Button
        // onClickを受け取っていなかった
        onClick={onClick}
        variant={"contained"}
        {...props}
        sx={{
          backgroundColor: "pink",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "pink",
            opacity: "0.7",
          },
        }}
        {...sx}
      >
        {children}
      </Button>
    </>
  );
};
const SecondaryButton = ({
  children,
  onClick,
  disabled,
  sx,
  ...props
}: Props) => {
  return (
    <>
      <Button
        // onClickを受け取っていなかった
        onClick={onClick}
        variant={"contained"}
        {...props}
        sx={{
          backgroundColor: "#c7c6c1",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#c7c6c1",
            opacity: "0.7",
          },
        }}
        {...sx}
      >
        {children}
      </Button>
    </>
  );
};

export { PrimaryButton, SecondaryButton };
