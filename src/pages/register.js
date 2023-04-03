import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const register = () => {
  const [isShowEye, setIsShowEye] = useState(false);
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <form
        action="#"
        className="bg-white shadow-xl p-10 rounded-xl flex flex-col gap-4 items-center justify-center"
      >
        <h1 className="text-center uppercase mb-8 text-2xl font-semibold text-neutral">
          Register
        </h1>
        <div className="text-neutral">
          <p className="uppercase font-medium">First Name</p>
          <input
            type="text"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="Jhon"
          />
        </div>
        <div className="text-neutral">
          <p className="uppercase font-medium">Last Name</p>
          <input
            type="text"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="Adam"
          />
        </div>
        <div className="text-neutral">
          <p className="uppercase font-medium">Email</p>
          <input
            type="email"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="joe@email.com"
          />
        </div>
        <div className="text-neutral">
          <p className="uppercase font-medium">Password</p>
          <div className="relative">
            <input
              type={isShowEye ? "text" : "password"}
              className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
              placeholder="Create Your Password"
            />
            {isShowEye ? (
              <button
                onClick={() => setIsShowEye(false)}
                className="absolute top-1/2 -translate-y-1/2 mt-1 right-4"
              >
                <FaRegEyeSlash />
              </button>
            ) : (
              <button
                onClick={() => setIsShowEye(true)}
                className="absolute top-1/2 -translate-y-1/2 mt-1 right-4"
              >
                <FaRegEye />
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-72 bg-primary py-2 rounded-md uppercase text-white font-medium mt-8"
        >
          Login
        </button>
        <div>
          <p className="text-sm text-neutral font-medium">
            Already have an account?{" "}
            <Link href="login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default register;
