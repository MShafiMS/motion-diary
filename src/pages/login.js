import auth from "@component/firebase.init";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "./Components/shared/SocialLogin";
import userService from "./api/userService";

const Login = () => {
  const [isShowEye, setIsShowEye] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let singInError;
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  useEffect(() => {
    if (user) {
      userService.put(`/create-user`, {
        name: user?.user?.displayName,
        email: user?.user?.email,
      });
      router.replace("/");
    }
  }, [user]);

  if (error) {
    singInError = <p className="text-red-600">{error?.message}</p>;
  }
  return (
    <div className="min-h-[70vh] my-8 flex flex-col items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:bg-white lg:shadow-xl p-10 rounded-xl flex flex-col gap-4 items-center justify-center"
      >
        <h1 className="text-center uppercase mb-8 text-2xl font-semibold text-neutral">
          Login
        </h1>
        <div className="text-neutral">
          <p className="uppercase font-medium">Email</p>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
            type="email"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="joe@email.com"
          />
          <p>
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-700">
                {errors.email.message}
              </span>
            )}
          </p>
        </div>
        <div className="text-neutral">
          <p className="uppercase font-medium">Password</p>
          <div className="relative">
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is require",
                },
                minLength: {
                  value: 6,
                  message: "Must be 6 characters or longer",
                },
              })}
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
          <p>
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.password.message}
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="label-text-alt text-red-700">
                {errors.password.message}
              </span>
            )}
          </p>
          <div className="w-72 flex justify-end font-medium mt-1">
            <Link href="reset" className="text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
        {singInError}
        <button
          type="submit"
          className="w-72 bg-primary py-2 rounded-md uppercase text-white font-medium mt-8"
        >
          Login
        </button>
        <div className="flex justify-center items-center gap-2 text-[#808080]">
          <div className="h-[1px] w-7 bg-[#808080]"></div>
          <p>or</p>
          <div className="h-[1px] w-7 bg-[#808080]"></div>
        </div>
        <SocialLogin />
        <div className="mt-4">
          <p className="text-sm text-neutral font-medium">
            Don't have an account yet?{" "}
            <Link href="register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
