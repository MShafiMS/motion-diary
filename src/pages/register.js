import auth from "@component/firebase.init";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import primaryAxios from "./api/primaryAxios";

const register = () => {
  const [isShowEye, setIsShowEye] = useState(false);

  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [name, setName] = useState("");
  const [createUserWithEmailAndPassword, user, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, upError] = useUpdateProfile(auth);

  const onSubmit = async (data) => {
    const name = data?.firstname + " " + data?.lastname;
    setName(name);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: name });
  };

  let singInError;
  useEffect(() => {
    if (user) {
      primaryAxios.put(`/users`, {
        name: name,
        email: user?.user?.email,
      });
      router.push("/");
    }
  }, [user, name]);

  if (error || upError) {
    singInError = (
      <p className="text-red-600">{error?.message || upError?.message}</p>
    );
  }
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <Head>
        <title>Register</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:bg-white lg:shadow-xl p-10 rounded-xl flex flex-col gap-4 items-center justify-center mt-12"
      >
        <h1 className="text-center uppercase mb-8 text-2xl font-semibold text-neutral">
          Register
        </h1>
        <div className="text-neutral">
          <p className="uppercase font-medium">First Name</p>
          <input
            {...register("firstname", {
              required: {
                value: true,
                message: "First Name is require",
              },
            })}
            type="text"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="Jhon"
            required
          />
          <label className="label">
            {errors.firstname?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.firstname.message}
              </span>
            )}
          </label>
        </div>
        <div className="text-neutral">
          <p className="uppercase font-medium">Last Name</p>
          <input
            {...register("lastname", {
              required: {
                value: true,
                message: "Last Name is require",
              },
            })}
            type="text"
            className="border border-silver py-1.5 rounded-md w-72 outline-none focus:outline-none px-2 mt-1.5"
            placeholder="Adam"
            required
          />
          <label className="label">
            {errors.lastname?.type === "required" && (
              <span className="label-text-alt text-red-700">
                {errors.lastname.message}
              </span>
            )}
          </label>
        </div>
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
            required
          />
          <label className="label">
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
          </label>
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
          <label className="label">
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
          </label>
        </div>
        {singInError}
        <button
          type="submit"
          className="w-72 bg-primary py-2 rounded-md uppercase text-white font-medium mt-8"
        >
          Login
        </button>
        <div className="mt-4">
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
