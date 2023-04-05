import useBlogs from "@component/Hooks/useBlogs";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

const BlogsView = () => {
  const { query } = useRouter();
  const blogId = query.id;
  const [blogs] = useBlogs();
  const blog = blogs?.data.find((s) => blogId === s._id);
  console.log(blog?.blog);
  return (
    <div className="mt-16 mx-14">
      <div className="text-center">
        <p className="uppercase text-sm">
          <sup className="italic">in</sup>{" "}
          <span className="text-primary">{blog?.category}</span>
        </p>
        <h1 className="font-bold text-4xl my-4">{blog?.title}</h1>
        <p className="text-sm uppercase text-[#808080]">{blog?.date}</p>
      </div>
      <img src={blog?.img} className="mx-auto w-full my-6" alt="" />
      <div>{ReactHtmlParser(blog?.blog)}</div>
    </div>
  );
};

export default BlogsView;
