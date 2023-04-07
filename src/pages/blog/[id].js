import { useBlogContext } from "@component/Hooks/BlogsContext";
import auth from "@component/firebase.init";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactHtmlParser from "react-html-parser";
import { AiFillLike } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import Loader from "../Components/shared/Loader/Loader";
import primaryAxios from "../api/primaryAxios";

const BlogsView = () => {
  const { query } = useRouter();
  const [user, loading] = useAuthState(auth);
  const blogId = query.id;
  const { blogs, isLoading, refetch } = useBlogContext();
  const blog = blogs?.data.find((s) => blogId === s._id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const checkLike = blog?.like?.find((l) => l.email === user?.email);

  const handleLike = (id) => {
    setIsLikeLoading(true);
    if (blog?.like) {
      (async () => {
        const { data } = await primaryAxios.put(`/blog-likes?id=${id}`, {
          like: [...blog?.like, { email: user?.email }],
        });
        if (data.success) {
          refetch();
          setIsLikeLoading(false);
        }
      })();
    } else {
      (async () => {
        const { data } = await primaryAxios.put(`/blog-likes?id=${id}`, {
          like: [{ email: user?.email }],
        });
        if (data.success) {
          refetch();
          setIsLikeLoading(false);
        }
      })();
    }
  };

  const handleRemoveLike = (id) => {
    setIsLikeLoading(true);
    let totalLikes = blog?.like;
    const index = blog?.like?.indexOf(checkLike);
    if (index > -1) {
      totalLikes?.splice(index, 1);
    }
    (async () => {
      const { data } = await primaryAxios.put(`/blog-likes?id=${id}`, {
        like: totalLikes,
      });
      if (data.success) {
        refetch();
        setIsLikeLoading(false);
      }
    })();
  };

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
        <div className="lg:w-5/12 lg:mt-0 mt-5">
          <div className="border border-silver relative rounded p-4 text-center">
            <p className="uppercase text-xs absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 font-semibold text-neutral">
              About Author
            </p>
            <img
              src="https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq-300x300.jpg"
              className="w-56 h-56 object-cover object-center mx-auto my-3"
              alt=""
            />
            <div className="text-sm text-neutral tracking-tighter">
              <p className="font-bold text-lg my-1 uppercase">
                {blog?.author || "Muhammad Shafi"}
              </p>
              <p className="mb-1">
                <span className="font-medium">Posted: </span>
                <span className="italic">{blog?.date}</span>
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
          </div>
          <div className="border text-neutral border-silver mt-3 rounded p-2 gap-2 flex items-center justify-center">
            {checkLike ? (
              <button
                onClick={() => handleRemoveLike(blog?._id)}
                disabled={isLikeLoading}
                className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center text-[#265fda]"
              >
                {isLikeLoading ? (
                  <RiLoader4Fill className="text-2xl animate-spin opacity-50" />
                ) : (
                  <>
                    <AiFillLike className="text-2xl" /> Like
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleLike(blog?._id)}
                disabled={isLikeLoading}
                className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center hover:text-[#265fda]/50"
              >
                {isLikeLoading ? (
                  <RiLoader4Fill className="text-2xl animate-spin opacity-50" />
                ) : (
                  <>
                    <AiFillLike className="text-2xl" /> Like
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center ${
                isFavorite ? "text-[#d12533]" : "lg:hover:text-[#e24a56]/50"
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
