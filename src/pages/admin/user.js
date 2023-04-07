import useUsers from "@component/Hooks/useUsers";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import primaryAxios from "../api/primaryAxios";
import AdminLayout from "./layout";

const User = () => {
  const [users, isLoading, refetch] = useUsers();

  const UserRow = ({ user, refetch, index }) => {
    const [roleModal, setRoleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState("");

    const handleMakeAdmin = (id) => {
      setLoading(true);
      (async () => {
        const { data } = await primaryAxios.put(`/user-role?id=${id}`, {
          role: "admin",
        });
        if (data.success) {
          refetch();
          setLoading(false);
        }
      })();
    };

    const handleMakeAuthor = async (id) => {
      setLoading(true);
      (async () => {
        const { data } = await primaryAxios.put(`/user-role?id=${id}`, {
          role: "author",
        });
        if (data.success) {
          refetch();
          setLoading(false);
        }
      })();
    };

    const handleDeleteRole = async (id) => {
      setLoading(true);
      (async () => {
        const { data } = await primaryAxios.put(`/user-role?id=${id}`, {
          role: "",
        });
        if (data.success) {
          refetch();
          setLoading(false);
        }
      })();
    };

    const handleDeleteUser = (id) => {
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
            const { data } = await primaryAxios.delete(`/user/${id}`);
            if (data.deletedCount > 0) {
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

    const { name, email, role, _id, image } = user;
    return (
      <tr className="border-b border-silver">
        <td className="text-center w-14 font-bold">{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded-full w-12 h-12">
                {image ? (
                  <img src={image} alt="Profile" />
                ) : (
                  <div>
                    {name && (
                      <div className="text-xl h-12 flex items-center justify-center font-bold bg-primary rounded-full text-white font-sub text-base-100 uppercase">
                        <p className="">{name?.slice(0, 1)}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold hover:underline">{name}</p>
              <div className="text-sm opacity-50">{email}</div>
            </div>
          </div>
        </td>
        <td>
          <button
            className="bg-primary/40 px-2 rounded uppercase font-bold text-sm"
            disabled={!role}
          >
            {role ? role : "User"}
          </button>
        </td>
        <td>
          <button
            onClick={() => setRoleModal(!roleModal)}
            className="hover:text-white hover:bg-primary duration-150 bg-[#808080]/40 px-2 rounded uppercase font-bold text-sm"
          >
            Change Role
          </button>
          <div className={`${!roleModal && "hidden"}`}>
            <div
              onClick={() => setRoleModal(false)}
              className="fixed top-1/2 cursor-pointer left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-full h-screen bg-white/20 border rounded-xl"
            ></div>
            <div className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-neutral shadow-md shadow-primary  rounded-2xl text-white">
              <div className="my-4">
                {user?.photoURL ? (
                  <img src={user?.photoURL} alt="profile" />
                ) : (
                  <CgProfile className="text-5xl mx-auto shadow-md shadow-primary rounded-full" />
                )}
                <div className="text-center my-2">
                  <p className="font-medium uppercase">{user?.name}</p>
                  <p className="text-xs italic">{user?.email}</p>
                </div>
              </div>
              {confirmModal ? (
                <>
                  {confirmModal === "admin" && (
                    <div className="flex gap-2 flex-col items-center justify-center">
                      <p>Are you sure you want to make Admin?</p>
                      <button
                        onClick={() => handleMakeAdmin(_id)}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        {loading ? (
                          <FaSpinner className="text-xl animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  )}
                  {confirmModal === "author" && (
                    <div className="flex gap-2 flex-col items-center justify-center">
                      <p>Are you sure you want to make Author?</p>
                      <button
                        onClick={() => handleMakeAuthor(_id)}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        {loading ? (
                          <FaSpinner className="text-xl animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  )}
                  {confirmModal === "remove" && (
                    <div className="flex gap-2 flex-col items-center justify-center">
                      <p>Are you sure you want to remove {role}?</p>
                      <button
                        onClick={() => handleDeleteRole(_id)}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        {loading ? (
                          <FaSpinner className="text-xl animate-spin" />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-center mt-4">
                    <button
                      onClick={() => setConfirmModal("")}
                      className="uppercase underline"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {!role ? (
                    <div className="flex gap-3 my-3 items-center justify-center">
                      <button
                        onClick={() => setConfirmModal("admin")}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => setConfirmModal("author")}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        Make Author
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3 my-3 items-center justify-center">
                      <button
                        onClick={() => setConfirmModal("remove")}
                        type="button"
                        className="text-lg uppercase font-bold border-silver border-2 rounded hover:bg-primary px-2 py-2"
                      >
                        Remove {role}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-center mt-4">
                    <button
                      onClick={() => setRoleModal(false)}
                      className="uppercase underline"
                    >
                      No Thanks
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </td>
        <td>
          <button
            onClick={() => handleDeleteUser(_id)}
            className="bg-primary px-2 rounded uppercase font-bold text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-neutral ">
          <thead>
            <tr className="py-2 border-b border-silver">
              <th className="text-start">Index</th>
              <th className="text-start">Name</th>
              <th className="text-start">Role</th>
              <th className="text-start">Action</th>
              <th className="text-start">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user, index) => (
              <UserRow
                key={user._id}
                index={index}
                user={user}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
User.PageLayout = AdminLayout;
export default User;
