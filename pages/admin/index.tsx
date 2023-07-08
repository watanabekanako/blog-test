import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import { format, compareAsc } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalWindow from "../../components/ModalWindow";
import _ from "lodash";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Link from "next/link";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useRouter } from "next/router";
import { mutate, useSWRConfig } from "swr";
import useSWR from "swr";
import useGetSelectedPost from "../../hooks/useGetSelectedPost";
import useGetPosts from "../../hooks/useGetPosts";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PrimaryButton } from "../../components/elements/Button/Button";
import SearchForm from "../../components/elements/SeacrhForm/SearchForm";
import { Post } from "../../types/type";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const BlogList = () => {
  const router = useRouter();
  const { queryPage } = router.query;
  console.log(queryPage, "queryPage");
  const [posts, setPosts] = React.useState<Post>();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [createdAt, setCreatedAt] = React.useState<any>("");
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const { allCategories } = useGetAllCategory();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    router.push(`?category=${selectedCategory}&queryPage=${1}`);
  };

  // 投稿削除モーダル
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
  const { key } = router.query;
  console.log(key, "key");
  const url = selectedCategory
    ? `http://localhost:3000/posts?category=${selectedCategory}&page=${queryPage}&key=${key}`
    : "http://localhost:3000/posts";

  const fetcher = (resource: string, init: Object) =>
    fetch(resource, init).then((res) => res.json());
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(url, fetcher);
  console.log(data, "swr");
  // キャンセルボタン押した後、選択したカテゴリ保持＋削除
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    mutate("http://localhost:3000/posts");
  };
  // ページング
  const perPage = 6;

  const [selectedPage, setSelectedPage] = React.useState<Number>();
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    router.push(`?category=${selectedCategory}&queryPage=${page}`);
    setSelectedPage(Number(page));
  };

  const [value, setValue] = React.useState<Date | null>(new Date());
  console.log(value, "value");
  console.log(data?.post, "data");
  const filterDate = data?.post.filter(
    (data: any) => new Date(data.createdAt) < value!
  );

  // 閲覧可能不可能
  const [published, setPublished] = useState(true);
  console.log(published, "publish");
  const handlePublishdeChange = (data: any) => {
    setPublished(data);
  };

  // const handlePublishedChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPublished(event.target.checked);
  // };
  // const handlePublishedChange = (id: number, value: boolean) => {
  //   const updatedPosts = posts?.map((post: any) => {
  //     if (post.id === id) {
  //       return { ...post, published: value };
  //     }
  //     return post;
  //   });
  //   setPublished(updatedPosts);
  // };
  return (
    <>
      <SearchForm setPosts={setPosts} />
      <DrawerHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    // label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell align="right">
                {format(new Date(), "yyyy-MM-dd")}
              </TableCell>
              <TableCell align="right">
                <Box>
                  {/* variantとlabelをなくすと枠が欠けないようになる */}
                  <FormControl fullWidth variant="outlined">
                    <Select
                      id="demo-simple-select"
                      value={selectedCategory}
                      onChange={handleChange}
                    >
                      {allCategories?.categories?.map((data: any) => {
                        return (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.post &&
              _.map(
                data?.post,
                (data: {
                  published: boolean;
                  title: string;
                  createdAt: Date;
                  content: string;
                  id: number;
                }) => (
                  <TableRow
                    key={data?.id}
                    sx={{
                      "&:nth-of-type(even)": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {/* data-fnsにて Date型からString型へ変更している. ReactNoveエラーは{}で囲んで出力出来ないものを出力しようとした場合*/}
                      {format(new Date(data?.createdAt), "yyyy/MM/dd")}
                    </TableCell>
                    {data?.id && (
                      <Link href={`/admin/${data.id}`}>
                        <TableCell align="right">{data?.title}</TableCell>
                      </Link>
                    )}
                    <TableCell align="right">
                      <FormGroup>
                        {/* <FormControlLabel
                          control={
                            <Switch
                              checked={published}
                              onChange={(event) =>
                                handlePublishedChange(
                                  data.id,
                                  event.target.checked
                                )
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label=""
                        /> */}
                      </FormGroup>
                      {/* <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                published.find(
                                  (post: any) => post.id === data.id
                                )?.published
                              }
                              onChange={(event) =>
                                handlePublishedChange(
                                  data.id,
                                  event.target.checked
                                )
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label=""
                        />
                      </FormGroup> */}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => router.push(`/admin/${data.id}`)}>
                        <AppRegistrationIcon sx={{ color: "gray" }} />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        {/* <button
                          onClick={() => {
                            fetch(`http://localhost:3000/posts/${data.id}`, {
                              method: "DELETE",
                            });
                            mutate("http://localhost:3000/posts/");
                          }}
                        >
                          [削除]
                        </button> */}

                        <Button onClick={() => handleDelete(data.id)}>
                          <DeleteIcon sx={{ color: "gray" }} />
                        </Button>
                        {/* <Button onClick={handleOpen}>
                          <DeleteIcon sx={{ color: "gray" }} />
                        </Button>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={open}
                          onClose={handleClose}
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={open}>
                            <Box sx={style}>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Duis mollis, est non commodo luctus, nisi erat
                                porttitor ligula.
                              </Typography>
                              <PrimaryButton
                                children={"削除する"}
                                onClick={() => handleDelete(data.id)}
                              />
                              <SecondaryButton
                                children={"キャンセル"}
                                onClick={handleCancel}
                              />
                            </Box>
                          </Fade>
                        </Modal> */}
                      </div>
                      {/* モーダルの作成 */}
                      {/* <ModalWindow
                        content={"aaaaaaa"}
                        // 開閉フラグ
                        children={<DeleteIcon sx={{ color: "gray" }} />}
                        // onClickButton={() => onDeleteClick(data.id)}
                        // onClose={() => setIsModalOpen(false)}
                        // open={undefined}
                        // setOpen={undefined}
                      /> */}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ my: 4 }}>
        {data?.totalCount ? (
          <>
            <Pagination
              count={Math.ceil(data?.totalCount / perPage)}
              page={Number(selectedPage ? selectedPage : 1)}
              onChange={(e: React.ChangeEvent<unknown>, page) => {
                router.push(`?category=${selectedCategory}&queryPage=${page}`);
                setSelectedPage(Number(page));
              }}
              // onChange={handlePageChange}
              shape="rounded"
              sx={{ m: "auto" }}
            />
          </>
        ) : (
          "検索結果がありません"
        )}
      </Stack>
    </>
  );
};
// export async function getStaticProps() {
//   // posts を取得するため外部 API endpoint を読み込む
//   const response = await axios(
//     `http://localhost:3000/posts?page=1&perPage=${6}&category=48`
//   );
//   const posts = response.data;

//   // { props: { posts } }を返すことで、
//   // Blog コンポーネントはビルド時に`posts`を prop として受け取る
//   return {
//     props: { posts },
//   };
// }
// export async function getStaticProps({ query }: any) {
//   // const router = useRouter();
//   // const perPage = query.perPage || 6;

//   const response = await axios.get(
//     `http://localhost:3000/posts?page=1&perPage=${6}&category=48`
//   );
//   const posts = response.data;

//   return {
//     props: { posts },
//   };
// }
export default BlogList;
