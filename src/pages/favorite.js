import { useBlogContext } from "@component/Hooks/BlogsContext";
import auth from "@component/firebase.init";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import Blog from "./Components/pages/Blogs/Blog";

const favorite = () => {
  const { blogs, isLoading, refetch } = useBlogContext();
  const [user, loading] = useAuthState(auth);

  return (
    <div className="lg:mx-10 m-4 lg:my-4 min-h-[20vh]">
      <Head>
        <title>Favorite Blogs</title>
      </Head>
      <h1 className="lg:text-2xl font-medium text-neutral text-lg mb-3 uppercase">
        Favorite Blogs
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {blogs?.data.data.map((blog, index) => (
          <>
            {blog?.favorite?.find((l) => l.email === user?.email) && (
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

export default favorite;
