import useUsers from "@component/Hooks/useUsers";
import { useState } from "react";
import AdminLayout from "./layout";

const User = () => {
  const [users, isLoading, refetch] = useUsers();

  const UserRow = ({ user, refetch, index }) => {
    const [roleModal, setRoleModal] = useState(false);

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
                    {name ? (
                      <div className="text-xl h-12 flex items-center justify-center font-bold bg-primary rounded-full text-white font-sub text-base-100 uppercase">
                        <p className="">{name?.slice(0, 1)}</p>
                      </div>
                    ) : (
                      <Profile />
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
            {role}
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
            <div className="fixed top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 w-96 h-72 bg-white border border-[#808080]/50 rounded-2xl"></div>
          </div>
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
