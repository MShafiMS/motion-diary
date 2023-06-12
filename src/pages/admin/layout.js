import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import { signOut } from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import Loader from "../Components/shared/Loader/Loader";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [role, roleLoading] = useRole();
  const [menu, setMenu] = useState(false);
  if (roleLoading) {
    return <Loader />;
  }
  if (role !== "admin") {
    signOut(auth);
    router.push("/login");
  }
  return (
    <div className="bg-white relative lg:flex justify-center w-full border-t border-silver">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="lg:hidden border-b border-silver">
        <button
          onClick={() => setMenu(!menu)}
          className="m-1 p-1 bg-primary rounded text-white text-xl font-bold"
        >
          {menu ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
      </div>
      <div
        className={`lg:w-1/5 w-8/12 lg:relative lg:left-0 z-10 duration-300 ${
          menu ? "left-0" : "-left-96"
        } absolute lg:h-[80vh] h-screen bg-neutral`}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 w-full">
            <ul className="w-full flex flex-col items-center gap-4 p-2 uppercase font-medium">
              <li className="w-full text-center text-white py-2 rounded">
                <h2>Admin Dashboard</h2>
              </li>
              <li className="w-full">
                <Link
                  href="/admin/user"
                  className={`inline-block ${
                    router.pathname == "/admin/user"
                      ? "bg-primary border border-primary text-white"
                      : "border border-white text-white"
                  } w-full text-center py-2 rounded`}
                >
                  Manage Users
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href="/admin/blogs"
                  className={`inline-block ${
                    router.pathname == "/admin/blogs"
                      ? "bg-primary border border-primary text-white"
                      : "border border-white text-white"
                  } w-full text-center py-2 rounded`}
                >
                  Manage Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
export default AdminLayout;
