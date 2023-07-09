import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useCallback, useState } from "react";
import TitleInput from "../../components/elements/Input/TitleInput";
import ContentInput from "../../components/elements/Input/ContentInput";
import { PrimaryButton } from "../../components/elements/Button/Button";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import { Stack, TextField, Button, FormControl } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ja from "date-fns/locale/ja";
type Inputs = {
  applicationDate: Date | null;
};
const PostDatail = (props: any) => {
  const router = useRouter();
  const { title, id, createdAt } = props.post;
  const [changeTitle, setChangeTitle] = useState(title);
  const [changeContent, setChangeContent] = useState(title);

  const handleSubmit = () => {
    axios.put(`http://localhost:3000/posts/${id}`, {
      title: changeTitle,
      content: changeContent,
      categoryId: 50,
    });
    alert("完了");
    router.push("/admin");
  };

  const [value, setValue] = React.useState<Date | null>(new Date(createdAt));
  console.log(createdAt, "value");

  const [message, setMessage] = useState("");

  const handleChanged = useCallback((newValue: any) => {
    setMessage("Value changed to " + newValue);
    setValue(newValue);
  }, []);
  const handleInputKeyDown = useCallback((event: any) => {
    event.preventDefault();
    if (event.keyCode === 8 || event.keyCode === 46) {
      setChangeTitle("");
    }
  }, []);
  const handleReset = useCallback(() => {
    setMessage("Reset through handleReset");
    setValue(null);
  }, []);
  console.log(changeTitle, "title");

  // rect^hook-form
  const { control } = useForm<Inputs>({
    defaultValues: { applicationDate: new Date() },
  });
  const validationRules = {
    applicationDate: {
      validate: (val: Date | null) => {
        if (val == null) {
          return "申請日を入力してください。";
        }
        if (Number.isNaN(val.getTime())) {
          return "日付を正しく入力してください。";
        }
        return true;
      },
    },
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
        　
        {/* 5. form要素のonSubmitに1.で取得しているhandleSubmitを指定します */}
        {/* 6.Controllerコンポーネントで TextFieldをReactHookFormと紐づけます。*/}
        <Controller
          name="applicationDate"
          control={control}
          rules={validationRules.applicationDate}
          render={({ field, fieldState }) => (
            <DatePicker
              label="申請日"
              inputFormat="yyyy年MM月dd日"
              mask="____年__月__日"
              leftArrowButtonText="前月を表示"
              rightArrowButtonText="次月を表示"
              toolbarTitle="日付選択"
              cancelText="キャンセル"
              okText="選択"
              toolbarFormat="yyyy年MM月dd日"
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
              {...field}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        value={changeTitle}
        onChange={(e: any) => setChangeTitle(e.target.value)}
        onKeyDown={handleInputKeyDown}
      ></TextField>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TextField
          value={changeTitle}
          onChange={(e: any) => setChangeTitle(e.target.value)}
          onKeyDown={handleInputKeyDown}
        ></TextField>
        <DatePicker
          // label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider> */}
      <TitleInput
        title={changeTitle}
        setTitle={setChangeTitle}
        helperText={""}
        error={false}
        sx={{ display: "flex" }}
      />
      <ContentInput
        content={changeContent}
        setContent={setChangeContent}
        sx={{ display: "flex" }}
      />
      <PrimaryButton children={"更新する"} onClick={handleSubmit} />
    </>
  );
};

export default PostDatail;
export const getStaticPaths: GetStaticPaths = async () => {
  // レンダリングする必要のあるパスのリストを生成する
  const response = await axios.get(`http://localhost:3000/posts`);
  const posts = response.data;
  console.log(posts, "paths");
  const paths = posts?.post?.map((post: any) => `/admin/${post.id}`);
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // フロントのurlパスパラメーターから取得
  const { id } = params;
  const response = await axios.get(`http://localhost:3000/posts/${id}`);
  const { post } = response.data;
  console.log(params, "params");
  return {
    props: {
      post,
    },
    revalidate: 1,
  };
};
