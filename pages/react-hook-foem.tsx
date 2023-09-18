import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Modal } from "@mui/material";
import { useRoutes, useNavigate } from "react-router-dom";
const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態を管理
  const navigate = useNavigate();
  // モーダルを開く関数
  const openModal = async () => {
    const hasError = await trigger(["name", "address"]);
    console.log(hasError, "hasError");

    if (hasError) {
      setIsModalOpen(true);
    }
  };

  // 画面遷移とモーダルの開閉を行う関数
  const onSubmit = async (data: any) => {
    const hasError = await trigger(["name", "address"]);
    console.log(hasError, "hasError");

    if (!hasError) {
      alert("era-");
    }

    if (hasError) {
      // リクエストを送信するなどの処理をここに追加

      setIsModalOpen(true); // モーダルを開く
    }
    try {
      // 画面遷移
      // navigate("/nextpage");
    } catch {
      console.log("error");
    }
    navigate("/nextpage");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 名前フォーム */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "名前を入力してください" }}
          render={({ field }) => (
            <TextField
              label="名前"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.name}
              helperText={errors.name ? (errors.name.message as string) : ""}
            />
          )}
        />

        {/* アドレス入力フォーム */}
        <Controller
          name="address"
          control={control}
          rules={{ required: "アドレスを入力してください" }}
          render={({ field }) => (
            <TextField
              label="アドレス"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.address}
              helperText={
                errors.address ? (errors.address.message as string) : ""
              }
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          送信
        </Button>
      </form>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2>確認</h2>
          <p>この内容で送信しますか？</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            送信
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            キャンセル
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Form;
