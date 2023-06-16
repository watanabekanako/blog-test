import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { format, compareAsc } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalWindow from "../components/ModalWindow";
import _ from "lodash";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import DefaultLayout from "../components/layout/defaultLayout";
import Link from "next/link";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useRouter } from "next/router";
import { mutate, useSWRConfig } from "swr";
import useSWR from "swr";
import useGetSelectedPost from "../hooks/useGetSelectedPost";
import useGetPosts from "../hooks/useGetPosts";
import useGetAllCategory from "../hooks/useGetAllCategory";
type Post = {
  post: [
    {
      id: number;
      title: string;
      content?: string;
      description: string;
      categoryId: number;
      createdAt: Date;
    }
  ];
};

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
  const hookPost = useGetPosts({ page: 3 });
  const [posts, setPosts] = React.useState<Post>();
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  const [createdAt, setCreatedAt] = React.useState<any>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { allCategories } = useGetAllCategory();
  console.log(allCategories, "allcategories");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };
  // const { post, isLoading, isError } = useGetPosts({ page: 1 });
  const { category, isLoading, isError } = useGetSelectedPost({
    categoryId: 49,
  });
  console.log(category, "uuuuu");
  console.log(selectedCategory, "selectCategory");
  // React.useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/posts/`)
  //     .then((response) => setPosts(response.data));
  // }, []);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const fetcher = (url: string) =>
    axios.get(url).then((response) => response.data);

  const { data, error } = useSWR(
    `http://localhost:3000/posts?category=${49}`,
    fetcher
  );

  // 投稿削除
  const onDeleteClick = (id: number) => {
    axios.delete(`http://localhost:3000/posts/${id}`).then(() => {
      mutate("http://localhost:3000/posts/");
      closeModal();
    });
    // axios.delete(`http://localhost:3000/posts/${id}`).then((response) => {
    //   axios.get(`http://localhost:3000/posts/`).then((response) => {
    //     setPosts(response.data);
    //     closeModal();
    //     router.push("/");
    //   });
    // });
    // axios.delete(`http://localhost:3000/posts/`).then(() => {
    //   refetch();
    // });
  };

  return (
    <DefaultLayout>
      <DrawerHeader />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">作成日</TableCell>
              <TableCell align="right">タイトル</TableCell>
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
                          <>
                            <MenuItem value={10}>{data.name}</MenuItem>
                          </>
                        );
                      })}
                      <MenuItem value={10}>kkkkkk</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
                      <Link href={`/admin/blog/${data.id}`}>
                        <TableCell align="right">{data?.title}</TableCell>
                      </Link>
                    )}
                    <TableCell align="right">wwwwww</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => router.push(`/admin/blog/${data.id}`)}
                      >
                        <AppRegistrationIcon sx={{ color: "gray" }} />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {/* モーダルの作成 */}
                      <ModalWindow
                        content={"aaaaaaa"}
                        children={<DeleteIcon sx={{ color: "gray" }} />}
                        onClickButton={() => onDeleteClick(data.id)}
                        // onClose={() => setIsModalOpen(false)}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultLayout>
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
