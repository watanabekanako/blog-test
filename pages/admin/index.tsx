import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
function Blog({ posts }: any) {
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    axios.get(`http:localhost:3000/posts/${id}`);
  }, []);
  return (
    <ul>
      {posts?.post?.map((post: any) => (
        <li key={post.id}> {post.title}</li>
      ))}
    </ul>
  );
}

// この関数はビルド時に実行される
export async function getStaticProps() {
  // posts を取得するため外部 API endpoint を読み込む
  const res = await fetch("http://localhost:3000/posts");
  const posts = await res.json();

  // { props: { posts } }を返すことで、
  // Blog コンポーネントはビルド時に`posts`を prop として受け取る
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
