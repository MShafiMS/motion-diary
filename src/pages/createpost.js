import { useBlogContext } from "@component/Hooks/BlogsContext";
import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import axios from "axios";
import { signOut } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BsCloudUploadFill } from "react-icons/bs";
import { useQuill } from "react-quilljs";
import Loader from "./Components/shared/Loader/Loader";
import primaryAxios from "./api/primaryAxios";
const createpost = () => {
  const { quill, quillRef } = useQuill();
  const { blogs, isLoading, refetch } = useBlogContext();
  const [user, loading] = useAuthState(auth);

  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [hover, setHover] = useState(false);

  const imageHostKey = "d39ad27ee9b8cd1b554105f125654da5";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  let date =
    new Date().toLocaleString("en-US", { month: "long" }) +
    " " +
    new Date().toLocaleString("en-US", { day: "2-digit" }) +
    ", " +
    new Date().getFullYear();
  const router = useRouter();
  const image = watch("image");

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    axios.post(url, formData).then((res) => {
      if (res?.data?.success) {
        const addBlog = {
          title: data?.title,
          category: data?.category,
          img: res?.data?.data.url,
          description: description,
          blog: value,
          author: user?.displayName,
          email: user?.email,
          date: date,
          like: 0,
          comment: [],
        };
        primaryAxios.post(`/blogs`, addBlog);
      }
    });
    reset();
    refetch();
    router.push("/");
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setDescription(quill.getText());
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

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

  const [role, roleLoading] = useRole();

  if (loading) {
    return <Loader />;
  }
  if (!user && !loading) {
    router.push("/login");
  }
  if (!loading && !roleLoading && role !== "admin" && role !== "author") {
    signOut(auth);
    router.push("/login");
  }
  return (
    <div className="lg:mx-8 mx-4 text-neutral">
      <Head>
        <title>Create Blog Post</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:flex gap-6 my-6">
        <div className="w-full">
          <h1 className="text-3xl font-semibold uppercase mb-6">
            Create Your Blog
          </h1>
          <p className="uppercase font-medium bg-silver px-1">Title</p>
          <input
            type="text"
            {...register("title")}
            required
            className="border border-[#808080]/40 p-3 lg:mb-0 mb-6 w-full text-lg outline-none focus:outline-none font-semibold"
            placeholder="Blog Title"
          />
          <div className="h-full lg:block hidden">
            <p className="uppercase font-medium bg-silver px-1 mt-8">
              Description
            </p>
            <div style={{ width: "100%", height: 300 }}>
              <div ref={quillRef} />
            </div>
          </div>
        </div>
        <div className="lg:w-7/12">
          <div className="lg:flex w-full justify-end hidden">
            <button
              type="submit"
              className="uppercase bg-primary font-medium px-3 py-2 rounded text-white mb-5"
            >
              Publish Blog
            </button>
          </div>
          <div>
            <p className="uppercase font-medium bg-silver px-1">Add Media</p>
            <div className="w-full">
              <input
                type="file"
                id="image"
                {...register("image")}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="w-full h-52 cursor-pointer border border-[#808080]/40 text-6xl flex items-center justify-center text-[#808080]/80"
              >
                {thumbnail ? (
                  <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="w-full h-full relative"
                  >
                    <div
                      className={`w-full h-full absolute top-0 left-0 flex items-center justify-center bg-silver/20 duration-300 ${
                        hover ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <BsCloudUploadFill />
                    </div>
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ) : (
                  <BsCloudUploadFill />
                )}
              </label>
            </div>
          </div>
          <p className="uppercase font-medium bg-silver lg:mt-8 mt-6 px-1">
            Blog Category
          </p>
          <div className="p-2 border border-[#808080]/40">
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                id="life-style"
                value="Life Style"
                {...register("category")}
                className="w-5"
              />
              <label
                htmlFor="life-style"
                className="uppercase text-lg font-medium"
              >
                Life Style
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="travel"
                value="Travel"
                className="w-5"
              />
              <label htmlFor="travel" className="uppercase text-lg font-medium">
                Travel
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="sports"
                value="Sports"
                className="w-5"
              />
              <label htmlFor="sports" className="uppercase text-lg font-medium">
                Sports
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="creative"
                value="Creative"
                className="w-5"
              />
              <label
                htmlFor="creative"
                className="uppercase text-lg font-medium"
              >
                Creative
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="diy"
                value="Diy"
                className="w-5"
              />
              <label htmlFor="diy" className="uppercase text-lg font-medium">
                Diy
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="food"
                value="Food"
                className="w-5"
              />
              <label htmlFor="food" className="uppercase text-lg font-medium">
                Food
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="category"
                {...register("category")}
                id="fashion"
                value="Fashion"
                className="w-5"
              />
              <label
                htmlFor="fashion"
                className="uppercase text-lg font-medium"
              >
                Fashion
              </label>
            </div>
          </div>
          <div className="lg:hidden h-[90vh] mb-36">
            <p className="uppercase font-medium bg-silver px-1 mt-8">
              Description
            </p>
            <div style={{ width: "100%", height: "100%" }}>
              <div ref={quillRef} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default createpost;
