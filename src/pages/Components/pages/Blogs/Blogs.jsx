import { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const fetchBlogs = async () => {
    const blogs = await (await fetch("blogs.json")).json();
    setBlogs(blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mx-14 mx-5 mt-8">
        {blogs?.map((blog, index) => (
          <div key={index}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
