import { useBlogContext } from "@component/Hooks/BlogsContext";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import Loader from "../Components/shared/Loader/Loader";

const BlogsView = () => {
  const { query } = useRouter();
  const blogId = query.id;
  const { blogs, isLoading, refetch } = useBlogContext();
  const blog = blogs?.data.find((s) => blogId === s._id);
  if (isLoading) {
    return <Loader />;
  }
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
      <div className="w-full flex gap-4 items-start my-6">
        <div className="w-full">
          <img src={blog?.img} className="w-full rounded" alt="" />
        </div>
        <div className="w-5/12">
          <div className="bg-silver rounded border border-[#808080]/50 p-2">
            <p>
              <span className="font-medium">Author Name: </span>
              {blog?.author || "Muhammad Shafi"}
            </p>
            <p>
              <span className="font-medium">Posted On: </span>
              {blog?.date}
            </p>
            <p>
              <span className="font-medium">Total Likes: </span>
              {blog?.date}
            </p>
          </div>
        </div>
      </div>
      <div className="my-8">{ReactHtmlParser(blog?.blog)}</div>
    </div>
  );
};

export default BlogsView;
