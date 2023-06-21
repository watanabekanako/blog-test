import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "./elements/Button/Button";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type Props = {
  content: string;
  children: React.ReactNode;
  onDeleteClick: any;
  handleOpen: any;
  handleClose: any;
};

const ModalWindow = ({
  content,
  children,
  onDeleteClick,
  handleOpen,
  handleClose,
}: Props) => {
  // モーダル表示非表示のstate
  // const [open, setOpen] = useState(false);
  // // モーダル表示処理
  // const handleOpen = () => setOpen(true);
  // // モーダル非表示処理
  // const handleClose = () => setOpen(false);
  // const CompleteButton = () => {
  //   const action = () => {
  //     completeAction();
  //     handleClose();
  //   };
  //   return action;
  // };
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      {/* <Modal
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <Typography id="modal-modal-description" sx={{ my: 2 }}>
              {content}
            </Typography>

            <PrimaryButton onClick={onDeleteClick}>削除します</PrimaryButton>
            <SecondaryButton onClick={handleClose}>キャンセル</SecondaryButton>
          </Box>
        </Box>
      </Modal> */}
    </div>
  );
};
export default ModalWindow;
