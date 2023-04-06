import { useBlogContext } from "@component/Hooks/BlogsContext";
import BlogRow from "./BlogRow";
import AdminLayout from "./layout";

const ManageBlogs = () => {
  const { blogs, isLoading, refetch } = useBlogContext();
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-neutral ">
          <thead>
            <tr className="py-2 border-b border-silver">
              <th className="text-start">Index</th>
              <th className="text-start">Blog</th>
              <th className="text-start">Author</th>
              <th className="text-start">View</th>
              <th className="text-start">Aprove</th>
              <th className="text-start">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.data?.map((blog, index) => (
              <BlogRow
                key={blog._id}
                index={index}
                blog={blog}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
ManageBlogs.PageLayout = AdminLayout;
export default ManageBlogs;
