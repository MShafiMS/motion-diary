import { useBlogContext } from "@component/Hooks/BlogsContext";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { AiFillLike } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import Loader from "../Components/shared/Loader/Loader";

const BlogsView = () => {
  const { query } = useRouter();
  const blogId = query.id;
  const { blogs, isLoading, refetch } = useBlogContext();
  const blog = blogs?.data.find((s) => blogId === s._id);
  const [isLike, setIsLike] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="mt-16 lg:mx-14 mx-6">
      <div className="text-center">
        <p className="uppercase text-sm">
          <sup className="italic">in</sup>{" "}
          <span className="text-primary">{blog?.category}</span>
        </p>
        <h1 className="font-bold text-4xl my-4">{blog?.title}</h1>
        <p className="text-sm uppercase text-[#808080]">{blog?.date}</p>
      </div>
      <div className="w-full lg:flex gap-4 items-start my-6">
        <div className="w-full">
          <img src={blog?.img} className="w-full rounded" alt="" />
        </div>
        <div className="lg:w-5/12">
          <div className="bg-silver rounded p-4 uppercase text-center">
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
              {blog?.like?.length || 0}
            </p>
            <p>
              <span className="font-medium">Total Comments: </span>
              {blog?.comment?.length || 0}
            </p>
          </div>
          <div className="bg-silver mt-3 rounded p-2 gap-2 flex items-center justify-center">
            <button
              onClick={() => setIsLike(!isLike)}
              className={`w-full py-4 gap-2 border-2 rounded border-white bg-white font-semibold uppercase flex items-center justify-center ${
                isLike
                  ? "text-[#5372b6] border-[#5372b6] bg-[#5372b6]/10"
                  : "hover:text-[#5372b6]/50 hover:bg-[#5372b6]/10 hover:border-[#5372b6]/50"
              }`}
            >
              <AiFillLike className="text-2xl" /> Like
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-full py-4 gap-2 border-2 rounded border-white bg-white font-semibold uppercase flex items-center justify-center ${
                isFavorite ? "text-[#e24a56] border-[#e24a56] bg-[#e24a56]/10" : "hover:text-[#e24a56]/50 hover:bg-[#e24a56]/10 hover:border-[#e24a56]/50"
              }`}
            >
              <MdFavorite className="text-2xl" /> Favorite
            </button>
          </div>
        </div>
      </div>
      <div className="my-8">{ReactHtmlParser(blog?.blog)}</div>
    </div>
  );
};

export default BlogsView;
