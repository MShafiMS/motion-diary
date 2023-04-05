import useBlogs from "@component/Hooks/useBlogs";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, isLoading] = useBlogs();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mx-14 mx-5 mt-8">
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
