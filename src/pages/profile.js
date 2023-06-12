import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";
import userService from "./api/userService";

const profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [, , userData, refetch] = useRole();
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const imageHostKey = "d39ad27ee9b8cd1b554105f125654da5";

  const image = watch("image");

  const onSubmit = async (updatedData) => {
    setUpdating(true);
    const image = updatedData.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    await axios.post(url, formData).then(async (res) => {
      if (res?.data?.success) {
        const { data } = await userService.put(`/create-user`, {
          name: updatedData.name,
          email: userData?.email,
          photoUrl: res?.data?.data.url,
        });
        if (data?.success) {
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
            title: "Profile Updated",
          });
          refetch();
          setEdit(false);
          setThumbnail(null);
          setUpdating(false);
        }
      }
    });
  };

  useEffect(() => {
    if (image && image[0]) {
      let reader = new FileReader();
      let file = image[0];
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [image]);
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      {edit ? (
        <div className="relative bg-neutral/90 p-10 text-white rounded-lg">
          <button
            onClick={() => setEdit(false)}
            type="button"
            className="absolute top-2 right-2 text-lg bg-primary/30 hover:bg-primary p-1 rounded"
          >
            <BiEdit />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="mb-2">
              <input
                type="file"
                accept="image/jpeg, image/png"
                id="image"
                {...register("image")}
                className="hidden"
                required
              />
              <label htmlFor="image">
                {thumbnail ? (
                  <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="relative"
                  >
                    <img
                      src={thumbnail}
                      className="mx-auto w-20 h-20 rounded-full"
                      alt="profile"
                    />
                    {hover && (
                      <div className="absolute bg-black/30 bottom-0 left-0 rounded-full w-20 h-20 z-10 p-2 flex justify-center items-center">
                        <FaCamera />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {userData?.photoUrl ? (
                      <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className="relative"
                      >
                        <img
                          src={userData?.photoUrl}
                          className="mx-auto w-20 h-20 rounded-full"
                          alt="profile"
                        />
                        {hover && (
                          <div className="absolute bg-black/30 bottom-0 left-0 rounded-full w-20 h-20 z-10 p-2 flex justify-center items-center">
                            <FaCamera />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-4xl w-20 h-20 flex justify-center items-center rounded-full bg-[#636363] hover:bg-[#636363]/70 cursor-pointer">
                        <AiOutlineCamera />
                      </div>
                    )}
                  </>
                )}
              </label>
            </div>

            <div className="text-center my-2">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                type="text"
                defaultValue={userData?.name}
                className="bg-neutral outline-none focus:outline-none py-1 px-1 rounded"
              />
            </div>
            <p>
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.name.message}
                </span>
              )}
            </p>
            <button
              type="submit"
              className="text-white flex mt-1 uppercase bg-primary hover:bg-primary/30 font-medium rounded-lg px-2 py-1"
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="relative flex flex-col items-center bg-neutral/90 p-10 text-white rounded-lg">
          <button
            type="button"
            onClick={() => setEdit(true)}
            className="absolute top-2 right-2 text-lg bg-primary/30 hover:bg-primary p-1 rounded"
          >
            <BiEdit />
          </button>
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="mx-auto w-20 h-20 rounded-full"
              alt="profile"
            />
          ) : (
            <CgProfile className="text-5xl mx-auto shadow-md shadow-primary rounded-full" />
          )}
          <div className="text-center my-2">
            <p className="font-medium uppercase">{userData?.name}</p>
            <p className="text-xs text-silver italic">{userData?.email}</p>
          </div>
          <button
            onClick={() => {
              signOut(auth);
            }}
            className="text-white flex mt-1 uppercase bg-primary hover:bg-primary/30 font-medium rounded-lg px-2 py-1"
          >
            Logout
          </button>
        </div>
      )}
      {updating && (
        <div className="w-screen h-screen bg-white/40 fixed top-0 left-0 z-10 flex justify-center items-center">
          <p className="text-center text-4xl text-neutral animate-bounce">
            Updating...
          </p>
        </div>
      )}
    </div>
  );
};

export default profile;
