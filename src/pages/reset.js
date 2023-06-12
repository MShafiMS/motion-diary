import auth from "@component/firebase.init";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Reset = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (data) => {
    await sendPasswordResetEmail(data?.email).then(async (res) => {
      if (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        await Toast.fire({
          icon: "success",
          title: "Email Sent",
        });
        reset();
        router.push("/login");
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        await Toast.fire({
          icon: "error",
          title: resetError?.code,
        });
        reset();
      }
    });
  };
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <Head>
        <title>Reset Password</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:bg-white lg:shadow-xl p-10 rounded-xl flex flex-col gap-4 items-center justify-center"
      >
        <h1 className="text-center uppercase mb-8 text-2xl font-semibold text-neutral">
          Reset Password
        </h1>
        <div className="text-neutral">
          <p className="uppercase font-medium">Email</p>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is require",
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
        {resetError && <p className="text-red-600">{resetError?.message}</p>}
        <button
          type="submit"
          className="w-72 bg-primary py-2 rounded-md uppercase text-white font-medium mt-2"
        >
          {sending ? "Sending..." : "Reset Password"}
        </button>
        <div className="mt-4">
          <Link
            href="/login"
            className="text-sm text-neutral font-medium underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Reset;
