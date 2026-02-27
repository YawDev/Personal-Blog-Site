import BlogList from "@/components/blog/Blogs";
import { Blog } from "../utils/types";
import { blogsData } from "../utils/InMemory";
export default async function BlogsPage() {
  //const [blogs, setBlogs] = useState<Blog[]>(blogsData);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <BlogList blogs={blogsData} />
    </>
  );
}
