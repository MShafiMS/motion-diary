import { useBlogContext } from "@component/Hooks/BlogsContext";
import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import { signOut } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Blog from "./Components/pages/Blogs/Blog";
import Loader from "./Components/shared/Loader/Loader";

const posted = () => {
  const { blogs, isLoading, refetch } = useBlogContext();
  const [user, loading] = useAuthState(auth);
  const postedBlogs = blogs?.data?.filter(
    (blog) => blog?.email === user?.email
  );
  const router = useRouter();
  const [role, roleLoading] = useRole();

  if (isLoading) {
    return <Loader />;
  }
  if (!user && !loading) {
    router.push("/login");
  }
  if (!loading && !roleLoading && role !== "admin" && role !== "author") {
    signOut(auth);
    router.push("/login");
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
