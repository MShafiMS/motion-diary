import { useBlogContext } from "@component/Hooks/BlogsContext";
import auth from "@component/firebase.init";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import Blog from "./Components/pages/Blogs/Blog";
import Loader from "./Components/shared/Loader/Loader";

const posted = () => {
  const { blogs, isLoading, refetch } = useBlogContext();
  const [user] = useAuthState(auth);
  const postedBlogs = blogs?.data?.filter(
    (blog) => blog?.email === user?.email
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="lg:mx-14 mx-5 my-8 min-h-[70vh]">
      <Head>
        <title>Posted Blogs</title>
      </Head>
      <h1 className="lg:text-3xl text-lg mb-5 uppercase">Posted Blogs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {postedBlogs
          ?.slice()
          .reverse()
          .map((blog, index) => (
            <div key={index}>
              <Blog blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default posted;
