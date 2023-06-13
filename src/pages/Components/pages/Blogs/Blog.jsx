import blogService from "@component/pages/api/blogService";
import Link from "next/link";
import Swal from "sweetalert2";

const Blog = ({ blog, action, refetch }) => {
  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        (async () => {
          const { data } = await blogService.delete(`/${id}`);
          if (data.success) {
            refetch();
            const Toast = Swal.mixin({
              toast: true,
              position: "top-right",
              iconColor: "green",
              customClass: {
                popup: "colored-toast",
              },
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            });
            await Toast.fire({
              icon: "success",
              title: "deleted",
            });
          }
        })();
      }
    });
  };
  return (
    <>
      <Link href={`/blog/${blog?._id}`}>
        <div>
          <img
            src={blog?.img}
            alt=""
            className="w-full h-56 object-cover object-center"
          />
          <p className="text-xs text-center py-6">
            <span className="italic">in</span>{" "}
            <span className="text-primary uppercase">{blog?.category}</span>
          </p>
          <h1 className="text-center text-xl font-bold hover:text-primary hover:underline duration-150">
            {blog?.title}
          </h1>
          <p className="text-center py-5 text-xs uppercase italic text-[#808080]">
            {blog?.date}
          </p>
          <p className="text-xs text-[#808080] text-justify">
            {blog?.description?.slice(0, 400)}...
          </p>
        </div>
      </Link>
      {action && (
        <div className="flex justify-end mt-4 gap-3">
          <Link
            href={`/edit/${blog?._id}`}
            className="px-5 py-0.5 bg-[#4969d3] hover:bg-[#364d8a] text-white rounded font-medium uppercase w-full text-center"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => handleDeleteBlog(blog?._id)}
            className="px-4 py-0.5 bg-[#c94545] hover:bg-[#a73f3f] text-white rounded font-medium uppercase w-full text-center"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default Blog;
