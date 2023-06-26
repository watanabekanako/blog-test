import { Grid, Pagination, Paper, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";
import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

type Props = {
  data: {
    post: {
      id: number;
      title: string;
      content?: string;
      thumbnailUrl: string;
      createdAt: Date;
    }[];
    totalCount: number;
  };
};
const Top = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    Router.push(`?page=${page}`);
  };
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <Grid container spacing={8}>
        {data.post.map((data: any) => (
          <Grid item xs={3} key={data.id}>
            <Paper>
              <Image
                src={"/catchimg_1.jpg"}
                width={500}
                height={500}
                alt={data.title}
              />
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
        count={Math.ceil(data.totalCount / 6)}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};
export default Top;

// SSRにて取得
export async function getServerSideProps(context: any) {
  console.log(context, "context");
  // const page = context.query.page ? context.query.page : 1;
  // const page = context.query.page ?? 1;
  const page = context.query.page || 1;
  // const category = context.query.category ? context.query.category : "";
  const category = context.query.category ?? "";
  const response = await axios.get(
    `http://localhost:3000/posts?page=${page}&category=${category}`
  );
  //   axiosの場合はresponse.dataにてデータが取得でき、fetchの場合はresponse.json()にて取得できる
  const data = response.data;
  console.log(data, "data");
  return { props: { data } };
}
