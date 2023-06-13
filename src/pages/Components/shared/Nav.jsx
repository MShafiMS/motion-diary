import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import userService from "@component/pages/api/userService";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import Logo from "../images/Logo";
import Loader from "./Loader/Loader";
import Search from "./Search";

const Nav = () => {
  const [UserImpl] = useAuthState(auth);
  const [role, roleLoading, userData, refetch] = useRole();
  const [nav, setNav] = useState(false);
  const [userNav, setUserNav] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSendRequest = async () => {
    setLoading(true);
    (async () => {
      const { data } = await userService.put(`/user-role?id=${userData?._id}`, {
        role: "requester",
      });
      if (data.success) {
        refetch();
        setLoading(false);
      }
    })();
  };

  useEffect(() => {
    const handleRouteChange = () => {
      // Update your state here
      setNav(false);
    };

    // Listen for route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  useEffect(() => {
    refetch();
  });
  if (roleLoading) {
    return <Loader />;
  }
  const Links = (
    <>
      <li className="w-full">
        <Link
          href="/profile"
          className="border-t inline-block w-full text-center py-1.5 hover:bg-primary hover:border-primary"
        >
          View Profile
        </Link>
      </li>
      <li className="w-full">
        <Link
          href="/favorite"
          className="border-t inline-block w-full text-center py-1.5 hover:bg-primary hover:border-primary"
        >
          Favorite Blogs
        </Link>
      </li>
      {role === "admin" && (
        <li className="w-full">
          <Link
            href="/posted"
            className="border-y inline-block w-full text-center py-1.5 hover:bg-primary hover:border-t-primary"
          >
            Posted Blogs
          </Link>
        </li>
      )}
      {role === "author" && (
        <li className="w-full">
          <Link
            href="/posted"
            className="border-y inline-block w-full text-center py-1.5 hover:bg-primary hover:border-t-primary"
          >
            Posted Blogs
          </Link>
        </li>
      )}
    </>
  );

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
              <Link href="/travel">Travel</Link>
            </li>
            <li>
              <Link href="/sports">Sports</Link>
            </li>
            <li>
              <Link href="/creative">Creative</Link>
            </li>
            <li>
              <Link href="/fashion">Fashion</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="py-4 flex gap-4 items-center lg:justify-center w-full">
          <Search />
        </div>
        {UserImpl ? (
          <>
            <div className="relative lg:block hidden">
              <button
                type="button"
                className="inline-block w-max font-medium border-white hover:border-primary/30 border-2 duration-200 rounded-lg"
                onClick={() => setUserNav(!userNav)}
              >
                <p className="px-2 rounded-md border border-[#808080]/30 w-full h-full flex items-center gap-1 text-neutral">
                  {userData?.name?.length > 7
                    ? userData?.name.slice(0, 7)
                    : userData?.name}
                  .. <IoMdArrowDropdown className="text-lg" />
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
                    {userData?.photoUrl ? (
                      <img
                        src={userData?.photoUrl}
                        className="mx-auto w-20 object-cover object-center h-20 rounded-full"
                        alt="profile"
                      />
                    ) : (
                      <CgProfile className="text-5xl mx-auto shadow-md shadow-primary rounded-full" />
                    )}
                    <div className="text-center my-2">
                      <p className="font-medium uppercase">{userData?.name}</p>
                      <p className="text-xs text-silver italic">
                        {userData?.email}
                      </p>
                    </div>
                    <div className="mt-4 w-full">
                      {!role && (
                        <button
                          onClick={() => handleSendRequest()}
                          disabled={loading}
                          className="block text-center my-3 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/70 font-medium px-5  py-1 text-sm"
                        >
                          {loading ? "loading..." : "Request to be a blogger"}
                        </button>
                      )}
                      {role === "requester" && (
                        <button
                          disabled
                          className="block text-center my-3 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/20 font-medium px-5  py-1 text-sm"
                        >
                          Request Send
                        </button>
                      )}
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
                        {Links}
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
          nav ? "top-0" : "top-[-2000px]"
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
        <div className="h-full flex flex-col items-center justify-start mt-14">
          <div>
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-14 h-14 object-cover object-center rounded-full mx-auto"
                alt="profile"
              />
            ) : (
              <CgProfile className="text-5xl mx-auto shadow-md shadow-primary rounded-full" />
            )}
            <div className="text-center my-2">
              <p className="font-medium uppercase">{userData?.name}</p>
              <p className="text-xs text-neutral italic">{userData?.email}</p>
            </div>
            <ul className="flex text-white bg-neutral/80 rounded flex-col items-center justify-center uppercase text-sm">
              {Links}
            </ul>
            {!role && (
              <button
                onClick={() => handleSendRequest()}
                disabled={loading}
                className="block text-center my-3 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/70 font-medium px-5  py-1 text-sm"
              >
                {loading ? "loading..." : "Request to be a blogger"}
              </button>
            )}
            {role === "requester" && (
              <button
                disabled
                className="block text-center my-3 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/20 font-medium px-5  py-1 text-sm"
              >
                Request Send
              </button>
            )}
            {role === "admin" && (
              <Link
                href="/createpost"
                className="block text-center my-2 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/60 font-medium px-5  py-1"
              >
                Post A Blog
              </Link>
            )}
            {role === "author" && (
              <Link
                href="/createpost"
                className="block text-center my-2 mx-auto w-fit uppercase border-2 rounded-lg bg-primary/60 font-medium px-5  py-1"
              >
                Post A Blog
              </Link>
            )}
            {role === "admin" && (
              <Link
                href="/admin/user"
                className="block text-center my-2 mx-auto w-fit uppercase border-2 rounded-lg font-medium px-5  py-1"
              >
                Admin Controls
              </Link>
            )}
          </div>
          <ul className="space-y-4 uppercase font-medium text-lg text-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/travel">Travel</Link>
            </li>
            <li>
              <Link href="/sports">Sports</Link>
            </li>
            <li>
              <Link href="/creative">Creative</Link>
            </li>
            <li>
              <Link href="/fashion">Fashion</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          {UserImpl ? (
            <div className="uppercase py-3 font-medium w-full flex flex-col gap-3 justify-center items-center text-lg">
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
