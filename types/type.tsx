export type Category = {
  id: number;
  name: string;
};
export type Post = {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
  Category?: Category[];
  createdAt: Date;
};
