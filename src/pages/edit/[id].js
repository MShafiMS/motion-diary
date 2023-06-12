import { useBlogContext } from "@component/Hooks/BlogsContext";
import useRole from "@component/Hooks/useAdmin";
import auth from "@component/firebase.init";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BsCloudUploadFill } from "react-icons/bs";
import { useQuill } from "react-quilljs";
import Swal from "sweetalert2";
import Loader from "../Components/shared/Loader/Loader";
import blogService from "../api/blogService";
import CreatePost from "../createpost";

const EditBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const image = watch("image");

  const { quill, quillRef } = useQuill();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { blogs, isLoading, refetch } = useBlogContext();
  const blogData = blogs?.data.data?.find(
    (blog) => blog?._id === router?.query?.id
  );

  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [hover, setHover] = useState(false);
  const [updating, setUpdating] = useState(false);

  const imageHostKey = "d39ad27ee9b8cd1b554105f125654da5";

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(blogData?.blog);
    }
  }, [quill]);
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
  let date =
    new Date().toLocaleString("en-US", { month: "long" }) +
    " " +
    new Date().toLocaleString("en-US", { day: "2-digit" }) +
    ", " +
    new Date().getFullYear();

  const onSubmit = async (data) => {
    setUpdating(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    if (image) {
      await axios.post(url, formData).then((res) => {
        if (res?.data?.success) {
          const addBlog = {
            title: data?.title,
            category: data?.category,
            img: res?.data?.data.url,
            description: description,
            blog: value,
            updated: date,
          };
          (async () => {
            const { data } = await blogService.put(
              `/edit-blog?id=${blogData?._id}`,
              addBlog
            );
            if (data.success) {
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
                title: "updated",
              });
              refetch();
              reset();
              setUpdating(false);
              router.push("/posted");
            }
          })();
        }
      });
    } else {
      const addBlog = {
        title: data?.title,
        category: data?.category,
        img: blogData?.img,
        description: description,
        blog: value,
        updated: date,
      };
      (async () => {
        const { data } = await blogService.put(
          `/edit-blog?id=${blogData?._id}`,
          addBlog
        );
        if (data.success) {
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
            title: "updated",
          });
          refetch();
          reset();
          setUpdating(false);
          router.push("/posted");
        }
      })();
    }
  };

  if (loading || isLoading) {
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
        <title>Edit Blog Post</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:flex gap-6 my-6">
        <div className="w-full">
          <h1 className="text-3xl font-semibold uppercase mb-6">
            Edit Your Blog
          </h1>
          <p className="uppercase font-medium bg-silver px-1">Title</p>
          <input
            type="text"
            {...register("title")}
            defaultValue={blogData?.title}
            required
            className="border border-[#808080]/40 p-3 w-full text-lg outline-none focus:outline-none font-semibold"
            placeholder="Blog Title"
          />
          <div className="h-[90vh] lg:h-[33vh] lg:mb-0 mb-36">
            <p className="uppercase font-medium bg-silver px-1 mt-8">
              Description
            </p>
            <div style={{ width: "100%", height: "100%" }}>
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
              Update Blog
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
                  <>
                    {blogData?.img ? (
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
                          src={blogData?.img}
                          alt="thumbnail"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <BsCloudUploadFill />
                    )}
                  </>
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
                checked={blogData?.category === "Life Style"}
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
                checked={blogData?.category === "Travel"}
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
                checked={blogData?.category === "Sports"}
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
                checked={blogData?.category === "Creative"}
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
                checked={blogData?.category === "Diy"}
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
                checked={blogData?.category === "Food"}
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
                checked={blogData?.category === "Fashion"}
              />
              <label
                htmlFor="fashion"
                className="uppercase text-lg font-medium"
              >
                Fashion
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="hidden">
        <CreatePost />
      </div>
      {updating && (
        <div className="w-screen h-screen bg-white/40 fixed top-0 left-0 z-10 flex justify-center items-center">
          <p className="text-center text-4xl text-primary animate-bounce">
            Updating...
          </p>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
