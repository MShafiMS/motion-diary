import { useBlogContext } from "@component/Hooks/BlogsContext";
import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { AiFillLike } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import Loader from "../Components/shared/Loader/Loader";
import blogService from "../api/blogService";

const BlogsView = () => {
  const { query } = useRouter();
  const [user, loading] = useAuthState(auth);
  const [, , userData] = useRole();
  const blogId = query.id;
  const { blogs, isLoading, refetch } = useBlogContext();
  const blog = blogs?.data.data.find((s) => blogId === s._id);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const { handleSubmit, reset } = useForm();
  const [isComment, setIsComment] = useState("");

  const checkLike = blog?.like?.find((l) => l.email === user?.email);
  const checkFavorite = blog?.favorite?.find((l) => l.email === user?.email);

  const handleLike = (id) => {
    setIsLikeLoading(true);
    refetch();
    if (blog?.like) {
      (async () => {
        const { data } = await blogService.put(`/blog-likes?id=${id}`, {
          like: [...blog?.like, { email: user?.email }],
        });
        if (data.success) {
          refetch();
          setIsLikeLoading(false);
        }
      })();
    } else {
      (async () => {
        const { data } = await blogService.put(`/blog-likes?id=${id}`, {
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
    refetch();
    let totalLikes = blog?.like;
    const index = blog?.like?.indexOf(checkLike);
    if (index > -1) {
      totalLikes?.splice(index, 1);
    }
    (async () => {
      const { data } = await blogService.put(`/blog-likes?id=${id}`, {
        like: totalLikes,
      });
      if (data.success) {
        refetch();
        setIsLikeLoading(false);
      }
    })();
  };

  const handleFavorite = (id) => {
    setIsFavoriteLoading(true);
    refetch();
    if (blog?.favorite) {
      (async () => {
        const { data } = await blogService.put(`/blog-favorite?id=${id}`, {
          favorite: [...blog?.favorite, { email: user?.email }],
        });
        if (data.success) {
          refetch();
          setIsFavoriteLoading(false);
        }
      })();
    } else {
      (async () => {
        const { data } = await blogService.put(`/blog-favorite?id=${id}`, {
          favorite: [{ email: user?.email }],
        });
        if (data.success) {
          refetch();
          setIsFavoriteLoading(false);
        }
      })();
    }
  };

  const handleRemoveFavorite = (id) => {
    setIsFavoriteLoading(true);
    refetch();
    let totalFavorite = blog?.favorite;
    const index = blog?.favorite?.indexOf(checkFavorite);
    if (index > -1) {
      totalFavorite?.splice(index, 1);
    }
    (async () => {
      const { data } = await blogService.put(`/blog-favorite?id=${id}`, {
        favorite: totalFavorite,
      });
      if (data.success) {
        refetch();
        setIsFavoriteLoading(false);
      }
    })();
  };

  const onSubmit = () => {
    setIsCommentLoading(true);
    refetch();
    if (blog?.comment) {
      (async () => {
        const { data } = await blogService.put(
          `/blog-comments?id=${blog?._id}`,
          {
            comment: [
              ...blog?.comment,
              {
                ...userData,
                comment: isComment,
              },
            ],
          }
        );
        if (data.success) {
          refetch();
          setIsComment("");
          reset();
          setIsCommentLoading(false);
        }
      })();
    } else {
      (async () => {
        const { data } = await blogService.put(
          `/blog-comments?id=${blog?._id}`,
          {
            comment: [
              {
                ...userData,
                comment: isComment,
              },
            ],
          }
        );
        if (data.success) {
          refetch();
          setIsComment("");
          reset();
          setIsCommentLoading(false);
        }
      })();
    }
  };

  useEffect(() => {
    refetch();
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="lg:mt-16 mt-8 lg:mx-14 mx-6">
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>{blog?.title}</title>
        <meta
          name="description"
          content={blog?.description?.slice(0, 50) + "..."}
        />

        <meta
          property="og:url"
          content={`https://motion-diary.vercel.app/blog/${blog?._id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={blog?.title} />
        <meta
          property="og:description"
          content={blog?.description?.slice(0, 50) + "..."}
        />
        <meta property="og:image" content={blog?.img} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="motion-diary.vercel.app" />
        <meta
          property="twitter:url"
          content={`https://motion-diary.vercel.app/blog/${blog?._id}`}
        />
        <meta name="twitter:title" content={blog?.title} />
        <meta
          name="twitter:description"
          content={blog?.description?.slice(0, 50) + "..."}
        />
        <meta name="twitter:image" content={blog?.img} />
      </Head>
      <DefaultSeo
        title={blog?.title}
        description={blog?.description?.slice(0, 50) + "..."}
        openGraph={{
          type: "website",
          title: blog?.title,
          description: blog?.description?.slice(0, 50) + "...",
          images: [
            {
              url: blog?.img,
              alt: blog?.title,
            },
          ],
        }}
      />

      <div className="text-center">
        <p className="uppercase text-sm">
          <sup className="italic">in</sup>{" "}
          <span className="text-primary">{blog?.category}</span>
        </p>
        <h1 className="font-bold text-xl lg:text-4xl my-4">{blog?.title}</h1>
        <p className="text-sm uppercase text-[#808080]">{blog?.date}</p>
      </div>
      <div className="lg:flex gap-6 my-6">
        <div className="w-full">
          <div className="w-full">
            <img src={blog?.img} className="w-full rounded" alt="" />
          </div>
          <div className="my-8">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blog?.blog }}
            ></div>
            {/* <div className="hidden">
              <CreatePost />
            </div> */}
          </div>
        </div>
        <div className="lg:w-5/12 lg:mt-0 mt-5">
          <div className="border border-silver relative rounded p-4 text-center">
            <p className="uppercase text-xs absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 font-semibold text-neutral">
              About Author
            </p>
            <img
              src={
                blog?.author?.photoUrl ||
                "https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq-300x300.jpg"
              }
              className="w-28 h-28 object-cover object-center mx-auto my-3"
              alt=""
            />
            <div className="text-sm text-neutral tracking-tighter">
              <p className="font-bold text-lg my-1 uppercase">
                {blog?.author?.name || "Muhammad Shafi"}
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
          {user ? (
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
              {checkFavorite ? (
                <button
                  onClick={() => handleRemoveFavorite(blog?._id)}
                  disabled={isFavoriteLoading}
                  className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center text-[#d12533]"
                >
                  {isFavoriteLoading ? (
                    <RiLoader4Fill className="text-2xl animate-spin opacity-50" />
                  ) : (
                    <>
                      <MdFavorite className="text-2xl" /> Favorite
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleFavorite(blog?._id)}
                  disabled={isFavoriteLoading}
                  className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center lg:hover:text-[#e24a56]/50"
                >
                  {isFavoriteLoading ? (
                    <RiLoader4Fill className="text-2xl animate-spin opacity-50" />
                  ) : (
                    <>
                      <MdFavorite className="text-2xl" /> Favorite
                    </>
                  )}
                </button>
              )}
              {/* <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center ${
                  isFavorite ? "text-[#d12533]" : "lg:hover:text-[#e24a56]/50"
                }`}
              >
                <MdFavorite className="text-2xl" /> Favorite
              </button> */}
            </div>
          ) : (
            <div className="border text-neutral border-silver mt-3 rounded p-2 gap-2 flex items-center justify-center">
              <Link
                href="/login"
                className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center lg:hover:text-[#265fda]/50"
              >
                <AiFillLike className="text-2xl" /> Like
              </Link>
              <Link
                href="/login"
                className="w-full py-4 gap-2 border border-silver rounded bg-white font-semibold uppercase flex items-center justify-center lg:hover:text-[#e24a56]/50"
              >
                <MdFavorite className="text-2xl" /> Favorite
              </Link>
            </div>
          )}
          {/* comment */}
          <div className="w-full border border-silver rounded p-2 my-6">
            <p className="pb-2 px-1 border-b border-silver text-neutral font-medium">
              {blog?.comment?.length} Comments
            </p>
            {user ? (
              <div className="flex items-start gap-2 border-b border-silver my-5 pb-5">
                <img
                  src={
                    userData?.photoUrl ||
                    "https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq-300x300.jpg"
                  }
                  alt="profile"
                  className="w-16 h-16 object-cover object-center rounded-full"
                />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="border border-silver rounded"
                >
                  <textarea
                    onChange={(e) => setIsComment(e.target.value)}
                    value={isComment}
                    name=""
                    id=""
                    cols="30"
                    rows="2"
                    className="w-full outline-none focus:outline-none p-2 font-medium text-neutral"
                    placeholder="Add a comment..."
                  ></textarea>
                  <div className="w-full bg-[#c9c9c9] rounded-b flex justify-end px-2 py-1">
                    <button
                      type="submit"
                      disabled={isCommentLoading}
                      className="uppercase font-medium text-sm px-2 py-0.5 text-white rounded-sm bg-[#6277af]"
                    >
                      {isCommentLoading ? (
                        <RiLoader4Fill className="text-xl animate-spin opacity-50" />
                      ) : (
                        <>send</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p className="my-2">
                To add a Like or Comment please{" "}
                <Link href="/login" className="underline text-[#2f7bee]">
                  Login
                </Link>{" "}
                first
              </p>
            )}
            <div className="flex flex-col border-t border-silver mb-5">
              {blog?.comment
                ?.slice()
                .reverse()
                .map((com, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-neutral border-b border-silver py-4"
                  >
                    <img
                      src={
                        com?.photoUrl ||
                        "https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq-300x300.jpg"
                      }
                      alt=""
                      className="w-12 h-12 object-cover object-center rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{com?.name}</h4>
                      <p>{com?.comment}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsView;
