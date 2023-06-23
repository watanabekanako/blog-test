import { Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";

type Props = {
  data: {
    post: {
      id: number;
      title: string;
      content?: string;
      thumbnailUrl: string;
      createdAt: Date;
    }[];
  };
};
const Top = ({ data }: Props) => {
  console.log(data, "data受け取る");
  return (
    <>
      <Grid container spacing={8}>
        {data.post.map((data: any) => (
          <>
            <Grid item xs={3}>
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
          </>
        ))}
      </Grid>
    </>
  );
};
export default Top;

// SSRにて取得
export async function getServerSideProps() {
  const response = await axios.get(`http://localhost:3000/posts`);
  //   axiosの場合はresponse.dataにてデータが取得でき、fetchの場合はresponse.json()にて取得できる
  const data = await response.data;
  console.log(data, "data");
  return { props: { data } };
}
