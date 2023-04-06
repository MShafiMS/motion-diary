import useBlogs from "@component/Hooks/useBlogs";
import Loader from "../../shared/Loader/Loader";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, isLoading] = useBlogs();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mx-14 mx-5 my-8">
        {blogs?.data
          ?.slice()
          .reverse()
          .map((blog, index) => (
            <div key={index}>
              <Blog blog={blog} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Blogs;
