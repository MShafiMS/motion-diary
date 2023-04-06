import Link from "next/link";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import primaryAxios from "../api/primaryAxios";

const BlogRow = ({ blog, refetch, index }) => {
  const [loading, setLoading] = useState(false);
  const handleApprove = (id) => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve",
    }).then((willApprove) => {
      if (willApprove.isConfirmed) {
        (async () => {
          const { data } = primaryAxios.put(`/blog-approve?id=${id}`, {
            approve: "approve",
          });
          if (data?.success) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Approved",
              showConfirmButton: false,
              timer: 1500,
            });
            setLoading(false);
          }
        })();
      }
    });
  };
  const { title, author, date, _id, img, approve } = blog;
  return (
    <tr className="border-b border-silver">
      <td className="text-center w-14 font-bold">{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-full w-12 h-12">
              {img && (
                <img
                  src={img}
                  alt="thimbnail"
                  className="w-full h-12 object-cover object-center"
                />
              )}
            </div>
          </div>
          <div>
            <p className="font-bold hover:underline">{title}</p>
            <div className="text-sm opacity-50">{date}</div>
          </div>
        </div>
      </td>
      <td>
        <button className="px-2 border border-neutral rounded uppercase font-bold text-sm">
          {author || "Muhammad Shafi"}
        </button>
      </td>
      <td>
        <Link
          href={`/blog/${_id}`}
          className="hover:text-white border border-neutral hover:bg-primary duration-150 bg-[#808080]/40 px-2 py-1 rounded uppercase font-bold text-sm"
        >
          View
        </Link>
      </td>
      <td className="flex justify-center my-2">
        <button
          onClick={() => handleApprove(_id)}
          disabled={approve}
          className={`text-neutral border border-neutral hover:bg-primary duration-150 ${
            approve ? "bg-[#b9b9b9]" : "bg-[#56be79]"
          } px-2 text-center py-1 rounded uppercase font-bold text-sm`}
        >
          {loading && !approve ? <FaSpinner className="animate-spin" /> : <>{approve ? "Approved" : "Approve"}</>}
        </button>
      </td>
      <td>
        <button className="text-white border border-neutral hover:bg-primary duration-150 bg-[#be5656] px-2 py-1 rounded uppercase font-bold text-sm">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogRow;
