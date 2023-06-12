import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DefaultLayout from "../../../components/layout/defaultLayout";
const Post = () => {
  const [post, setPost] = useState<any>();

  const router = useRouter();
  const id = router.query.id;
  console.log(id, "id");
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/posts/${id}`)
        .then((response) => setPost(response.data));
    } else return;
  }, [id]);

  return (
    <>
      <DefaultLayout>{post?.post.title}</DefaultLayout>
    </>
  );
};
export default Post;
