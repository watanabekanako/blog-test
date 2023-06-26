import { Grid, Paper, Typography, Pagination } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { Head } from "next/document";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

// await router.push(`?key=${searchWord}`);
// const response = await axios.get(
//   `http://localhost:3000/posts?key=${searchWord}`
// );

const Test = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  console.log(currentPage, "currnetpage");
  const router = useRouter();
  const selectedPage = router.query.page ? router.query.page : 1;
  console.log(selectedPage, "select");
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `http://localhost:3000/posts?page=${currentPage}`,
    fetcher
  );

  console.log(data, "data");
  const handlePageChange = (e: any, page: number) => {
    // 下記つまった　pageになにがわたってくるか、currentPageと混乱
    setCurrentPage(page);
    router.push(`/test?page=${currentPage}`);
  };
  return (
    <>
      <Grid container spacing={8}>
        {data?.post?.map((data: any) => (
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
        count={Math.ceil(data?.totalCount / 6)}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Test;
