import { useBlogContext } from "@component/Hooks/BlogsContext";
import Loader from "../../shared/Loader/Loader";
import Blog from "./Blog";

const Blogs = () => {
  const { blogs, isLoading, refetch } = useBlogContext();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mx-14 mx-5 my-8">
        {blogs?.data.data
          ?.slice()
          .reverse()
          .map((blog, index) => (
            <>
              {blog?.approve && (
                <div key={index}>
                  <Blog blog={blog} />
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
};

export default Blogs;
