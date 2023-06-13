import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { format, compareAsc } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalWindow from "../components/ModalWindow";
import _ from "lodash";
import {
  Button,
  MenuItem,
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

const BlogList = ({ posts }: any) => {
  const [open, setOpen] = React.useState(false);

  const [createdAt, setCreatedAt] = React.useState<any>("");
  const handleChange = (event: SelectChangeEvent) => {
    setCreatedAt(event.target.value);
  };
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/categories/${6}`)
      .then((response) => {
        setSelectedCategory(response.data);
      });
  }, []);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const onDeleteClick = () => {
    <ModalWindow
      content={"uuuuuuu"}
      open={true}
      close={() => alert("uuuuu")}
    />;
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
              <TableCell align="right">カテゴリ</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.post &&
              _.map(
                posts?.post,
                (data: {
                  title: string;
                  createdAt: Date;
                  content: string;
                  id: number;
                }) => (
                  <TableRow
                    key={data.id}
                    sx={{
                      "&:nth-of-type(even)": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {/* data-fnsにて */}
                      {format(new Date(data?.createdAt), "yyyy/MM/dd")}
                    </TableCell>
                    {data.id && (
                      <Link href={`/admin/blog/${data.id}`}>
                        <TableCell align="right">{data?.title}</TableCell>
                      </Link>
                    )}
                    {/* <TableCell align="right">{data.createdAt}</TableCell> */}
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
                      <Button onClick={onDeleteClick}>
                        <DeleteIcon sx={{ color: "gray" }} />
                      </Button>
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
export async function getStaticProps({ query }: any) {
  // const router = useRouter();
  // const perPage = query.perPage || 6;

  const response = await axios.get(
    `http://localhost:3000/posts?page=1&perPage=${6}&category=48`
  );
  const posts = response.data;

  return {
    props: { posts },
  };
}
export default BlogList;
