import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { format, compareAsc } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
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
  return (
    <DefaultLayout>
      <Main open={open}>
        <DrawerHeader />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createdAt}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={6}>2022/6</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">作成日</TableCell>
                <TableCell align="right">作成者</TableCell>
                <TableCell align="right">ゴミ箱</TableCell>
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
                      <TableCell component="th" scope="row">
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
                      <TableCell align="right">wwwwww</TableCell>
                      <TableCell align="right">
                        {/* モーダルの作成 */}
                        <Button onClick={() => alert("uuuuu")}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
    </DefaultLayout>
  );
};
export async function getStaticProps() {
  // posts を取得するため外部 API endpoint を読み込む
  const response = await axios(
    `http://localhost:3000/posts?page=1&perPage=${6}&category=48`
  );
  const posts = response.data;

  // { props: { posts } }を返すことで、
  // Blog コンポーネントはビルド時に`posts`を prop として受け取る
  return {
    props: { posts },
  };
}
export default BlogList;
