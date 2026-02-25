import BlogDetails from "@/components/blog/BlogDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <>
      <BlogDetails
        blog={{
          id: "1",
          title: "Here is a",
          datePosted: new Date(),
          content: "This is the content of the blog post.",
          preview: "This is the preview of the blog post.",
        }}
      />
    </>
  );
}
