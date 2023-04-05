import primaryAxios from "@component/pages/api/primaryAxios";
import { useQuery } from "react-query";
import Blog from "./Blog";

const Blogs = () => {
  const { data: blogs, isLoading } = useQuery(["blogs"], () =>
    primaryAxios.get(`/blogs`)
  );
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mx-14 mx-5 mt-8">
        {blogs?.data?.map((blog, index) => (
          <div key={index}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
