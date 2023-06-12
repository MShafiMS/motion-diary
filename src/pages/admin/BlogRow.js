import Link from "next/link";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import blogService from "../api/blogService";

const BlogRow = ({ blog, refetch, index }) => {
  const [loading, setLoading] = useState(false);
  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setLoading(true);
        (async () => {
          const { data } = await blogService.put(`/approve-blog?id=${id}`, {
            approve: "approve",
          });
          if (data.success) {
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
              title: "Approved",
            });
            refetch();
            setLoading(false);
          }
        })();
      }
    });
  };
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setLoading(true);
        (async () => {
          const { data } = await blogService.put(`/approve-blog?id=${id}`, {
            approve: "",
          });
          if (data.success) {
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
              title: "Removed",
            });
            refetch();
            setLoading(false);
          }
        })();
      }
    });
  };
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
            refetch();
          }
        })();
      }
    });
  };
  return (
    <tr className="border-b border-silver">
      <td className="text-center w-14 font-bold">{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-full w-12 h-12">
              {blog?.img && (
                <img
                  src={blog?.img}
                  alt="thimbnail"
                  className="w-full h-12 object-cover object-center"
                />
              )}
            </div>
          </div>
          <div>
            <p className="font-bold hover:underline">{blog?.title}</p>
            <div className="text-sm opacity-50">{blog?.date}</div>
          </div>
        </div>
      </td>
      <td>
        <button className="px-2 border border-neutral rounded uppercase font-bold text-sm">
          {blog?.author || "Muhammad Shafi"}
        </button>
      </td>
      <td>
        <Link
          href={`/blog/${blog?._id}`}
          className="hover:text-white border border-neutral hover:bg-primary duration-150 bg-[#808080]/40 px-2 py-1 rounded uppercase font-bold text-sm"
        >
          View
        </Link>
      </td>
      <td className="flex justify-center my-2">
        {blog?.approve ? (
          <button
            onClick={() => handleRemove(blog?._id)}
            className="text-white border border-neutral duration-150 bg-[#be5670] px-2 text-center py-1 rounded uppercase font-bold text-sm"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <>Remove</>}
          </button>
        ) : (
          <button
            onClick={() => handleApprove(blog?._id)}
            className="text-neutral border border-neutral hover:bg-primary duration-150 bg-[#56be79] px-2 text-center py-1 rounded uppercase font-bold text-sm"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <>Approve</>}
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleDeleteBlog(blog?._id)}
          className="text-white border border-neutral hover:bg-primary duration-150 bg-[#be5656] px-2 py-1 rounded uppercase font-bold text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogRow;
