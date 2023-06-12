import { useBlogContext } from "@component/Hooks/BlogsContext";
import Head from "next/head";
import Blog from "./Components/pages/Blogs/Blog";

const sports = () => {
  const { blogs, isLoading, refetch } = useBlogContext();
  return (
    <div className="lg:mx-10 m-4 lg:my-4 min-h-[20vh]">
      <Head>
        <title>Sports Blogs</title>
      </Head>
      <h1 className="lg:text-2xl font-medium text-neutral text-lg mb-3 uppercase">
        Sports Blogs
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {blogs?.data.data.map((blog, index) => (
          <>
            {blog?.category === "Sports" && (
              <div key={index}>
                <Blog blog={blog} refetch={refetch} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default sports;
