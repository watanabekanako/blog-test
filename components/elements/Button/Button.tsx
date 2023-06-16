import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
type Props = {
  children: string;

  // onClick: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
};
const PrimaryButton = (props: Props) => {
  return (
    <>
      <Button
        variant={"contained"}
        {...props}
        sx={{
          backgroundColor: "pink",
          fontWeight: "bold",
        }}
      >
        {props.children}
      </Button>
    </>
  );
};

export default PrimaryButton;
