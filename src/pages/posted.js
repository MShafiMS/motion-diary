import { useBlogContext } from "@component/Hooks/BlogsContext";
import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import { signOut } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiViewGridAdd } from "react-icons/hi";
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
      <h1 className="lg:text-2xl font-medium text-neutral text-lg mb-1 uppercase">
        Posted Blogs ({postedBlogs?.length})
      </h1>
      {postedBlogs?.length === 0 ? (
        <div className="flex flex-col justify-center h-[50vh] p-4 border border-silver items-center">
          <Link
            href="/createpost"
            className="w-fit mx-auto p-6 bg-primary/25 hover:bg-primary/40 rounded-lg"
          >
            <HiViewGridAdd className="text-4xl text-primary mx-auto" />
            <p className="text-center font-medium mt-3 uppercase text-neutral">
              Post A Blog
            </p>
          </Link>
          <p className="text-lg mt-6 text-center uppercase text-neutral font-medium">
            There is no posted blog!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 border border-silver">
          {postedBlogs
            ?.slice()
            .reverse()
            .map((blog, index) => (
              <div key={index}>
                <Blog blog={blog} action refetch={refetch} />
              </div>
            ))}
          <div className="flex flex-col justify-center rounded p-4 border border-silver items-center">
            <Link
              href="/createpost"
              className="w-fit mx-auto p-6 bg-primary/25 hover:bg-primary/40 rounded-lg"
            >
              <HiViewGridAdd className="text-4xl text-primary mx-auto" />
              <p className="text-center font-medium mt-3 uppercase text-neutral">
                Post A New Blog
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default posted;
