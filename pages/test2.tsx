import { Grid, Paper, Typography, Pagination } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { Head } from "next/document";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";
import useGetPosts from "../hooks/useGetPosts";
// await router.push(`?key=${searchWord}`);
// const response = await axios.get(
//   `http://localhost:3000/posts?key=${searchWord}`
// );

const Test2 = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const router = useRouter();
  const selectedPage = router.query.page ? router.query.page : 1;
  console.log(selectedPage, "select");

  const { post } = useGetPosts({ page: currentPage });
  console.log(currentPage, "current");
  console.log(post?.totalCount, "post");
  const handlePageChange = (e: any, page: number) => {
    // 下記つまった　pageになにがわたってくるか、currentPageと混乱
    router.push(`/test?page=${page}`);
    setCurrentPage(page);
  };
  return (
    <>
      <Grid container spacing={8}>
        {post?.post?.map((data: any) => (
          <Grid item xs={3} key={data.id}>
            <Paper>
              {/* <Image
                src={"/catchimg_1.jpg"}
                width={500}
                height={500}
                alt={data.title}
              /> */}
              <Typography
                sx={{
                  backgroundColor: "#f2809e",
                  borderRadius: 2,
                  color: "#fff",
                  display: "inline-block",
                  m: 2,
                  px: 2,
                }}
              >
                {data.category.name}
              </Typography>
              <Typography sx={{ m: 2 }}>{data.title}</Typography>
              <Typography sx={{ m: 2 }}>
                {format(new Date(data.createdAt), "yyyy年MM月dd日")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Pagination
        //         count={Math.ceil(Number(post?.totalCount) / 6)}
        count={Math.ceil(post?.totalCount) / 6}
        //         count={Math.ceil(post?.totalCount / 6)}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Test2;

// typescript!のこと　nullの除外

// 現状のエラーについて
