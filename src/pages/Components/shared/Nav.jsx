import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import Logo from "../images/Logo";

const Nav = () => {
  const [UserImpl] = useAuthState(auth);
  const [role, roleLoading] = useRole();
  const [nav, setNav] = useState(false);
  const [userNav, setUserNav] = useState(false);
  return (
    <div className="bg-white">
      <Link href="/">
        <Logo />
      </Link>
      <div className="text-neutral border-t border-silver shadow-lg lg:px-8 px-4 flex items-center gap-4 w-full justify-between">
        <div className="lg:block hidden text-xs font-medium tracking-wider py-5 w-full">
          <ul className="flex items-center justify-start gap-10 uppercase">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Features</Link>
            </li>
            <li>
              <Link href="#">Life Style</Link>
            </li>
            <li>
              <Link href="#">Travel</Link>
            </li>
            <li>
              <Link href="#">Sports</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
        </div>
        <div className="py-4 flex gap-4 items-center w-fit">
          <div className="relative lg:w-72 w-56">
            <input
              type="text"
              className="w-full bg-silver py-1 rounded pl-8 pr-2 placeholder:uppercase outline-none focus:outline-none"
              placeholder="Search Blogs"
            />
            <FiSearch className="text-neutral absolute left-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {UserImpl ? (
          <>
            <div className="relative">
              <button
                type="button"
                className="inline-block w-max font-medium border-white hover:border-primary/30 border-2 duration-200 rounded-lg"
                onClick={() => setUserNav(!userNav)}
              >
                <p className="px-2 rounded-md border border-[#808080]/30 w-full h-full flex items-center gap-1 text-neutral">
                  {UserImpl?.displayName.slice(0, 7)}..{" "}
                  <IoMdArrowDropdown className="text-lg" />
                </p>
              </button>
              <div
                onClick={() => setUserNav(false)}
                className={`fixed w-full h-screen bg-white/20 top-0 left-0 z-10 ${
                  !userNav && "hidden"
                }`}
              />
              {userNav && (
                <div className="absolute top-8 -left-36 w-64 rounded-lg z-20 h-max bg-neutral">
                  <div className="w-full text-white mt-6">
                    {UserImpl?.photoURL ? (
                      <img src={UserImpl?.photoURL} alt="profile" />
                    ) : (
                      <CgProfile className="text-5xl mx-auto shadow-md shadow-primary rounded-full" />
                    )}
                    <div className="text-center my-2">
                      <p className="font-medium uppercase">
                        {UserImpl?.displayName}
                      </p>
                      <p className="text-xs text-silver italic">
                        {UserImpl?.email}
                      </p>
                    </div>
                    <div className="mt-4 w-full">
                      {role === "admin" && (
                        <Link
                          href="/createpost"
                          className="block text-center my-4 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/60 font-medium px-5  py-1"
                        >
                          Post A Blog
                        </Link>
                      )}
                      {role === "author" && (
                        <Link
                          href="/createpost"
                          className="block text-center my-4 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/60 font-medium px-5  py-1"
                        >
                          Post A Blog
                        </Link>
                      )}
                      <ul className="flex flex-col items-center justify-center uppercase text-sm">
                        <li className="w-full">
                          <a
                            href="#"
                            className="border-t inline-block w-full text-center py-1.5 hover:bg-primary hover:border-primary"
                          >
                            View Profile
                          </a>
                        </li>
                        <li className="w-full">
                          <a
                            href="#"
                            className="border-t inline-block w-full text-center py-1.5 hover:bg-primary hover:border-primary"
                          >
                            Saved Blogs
                          </a>
                        </li>
                        <li className="w-full">
                          <a
                            href="#"
                            className="border-y inline-block w-full text-center py-1.5 hover:bg-primary hover:border-t-primary"
                          >
                            Posted Blogs
                          </a>
                        </li>
                      </ul>
                      {role === "admin" && (
                        <Link
                          href="/admin/user"
                          className="block text-center my-2 mx-auto w-fit uppercase border-2 rounded bg-black font-medium px-5  py-1"
                        >
                          Admin Controls
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-white/70">
                    <button
                      onClick={() => {
                        signOut(auth);
                        setUserNav(false);
                      }}
                      className="w-full text-white mt-1 uppercase hover:bg-[#808080]/30 font-medium rounded-b-lg py-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-sm uppercase py-3 font-medium w-2/5 lg:flex hidden gap-3 justify-end">
            <Link
              href="/register"
              className="bg-primary rounded-sm text-white px-3 py-1"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="bg-black rounded-sm text-white px-3 py-1"
            >
              Login
            </Link>
          </div>
        )}
        {/* menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setNav(true)}
            className="text-2xl bg-primary text-white p-1 rounded"
          >
            <HiOutlineMenuAlt2 />
          </button>
        </div>
      </div>
      {/* nav for mobile device */}
      <div
        className={`fixed ${
          nav ? "top-0" : "top-[-1000px]"
        } duration-500 left-0 w-full h-screen bg-white z-50`}
      >
        <div className="flex justify-end m-4">
          <button
            type="button"
            onClick={() => setNav(false)}
            className="text-2xl bg-neutral text-white p-1 rounded"
          >
            <RiCloseLine />
          </button>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <ul className="space-y-6 uppercase font-medium text-lg text-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Features</Link>
            </li>
            <li>
              <Link href="#">Life Style</Link>
            </li>
            <li>
              <Link href="#">Travel</Link>
            </li>
            <li>
              <Link href="#">Sports</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
          {UserImpl ? (
            <div className="uppercase py-3 font-medium w-full flex flex-col gap-3 justify-center items-center text-lg">
              <Link
                href="/createpost"
                className="bg-black rounded-sm text-white px-3 py-1"
              >
                Post Blog
              </Link>
              <button
                onClick={() => signOut(auth)}
                type="button"
                className="bg-primary rounded-sm uppercase text-white px-3 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="uppercase py-3 font-medium w-full flex flex-col gap-3 justify-center items-center text-lg">
              <Link
                href="/register"
                className="bg-primary rounded-sm text-white px-3 py-1"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-black rounded-sm text-white px-3 py-1"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
