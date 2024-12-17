type Author = {
  name: string;
  image: string;
  designation: string;
  github?: string;
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
  innerHTML?: string;
};
