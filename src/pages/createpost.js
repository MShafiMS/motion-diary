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
import { BiExpand } from "react-icons/bi";
import { BsCloudUploadFill } from "react-icons/bs";
import { useQuill } from "react-quilljs";
import Swal from "sweetalert2";
import Loader from "./Components/shared/Loader/Loader";
import blogService from "./api/blogService";
const createpost = () => {
  const { quill, quillRef } = useQuill();
  const { blogs, isLoading, refetch } = useBlogContext();
  const [role, roleLoading, userData] = useRole();
  const [user, loading] = useAuthState(auth);
  const [posting, setPosting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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
  const category = watch("category");

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };
  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    await axios.post(url, formData).then((res) => {
      if (res?.data?.success) {
        insertToEditor(res?.data?.data.url);
      }
    });
    setUploading(false);
  };
  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  const onSubmit = async (data) => {
    if (!image || !category || description?.length <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All feild required!",
      });
    } else {
      setPosting(true);
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      await axios.post(url, formData).then(async (res) => {
        if (res?.data?.success) {
          const addBlog = {
            title: data?.title,
            category: data?.category,
            img: res?.data?.data.url,
            description: description,
            blog: value,
            author: userData,
            email: user?.email,
            date: date,
            like: [],
            comment: [],
          };
          await blogService.post("/post-blog", addBlog);
        }
      });
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
        title: "Posted",
      });
      setPosting(false);
      reset();
      refetch();
      router.push("/posted");
    }
  };

  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
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
    <div className="relative lg:mx-8 mx-4 text-neutral">
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
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            className={`border border-[#808080]/40 p-3 w-full text-lg outline-none focus:outline-none font-semibold ${
              errors?.title?.type === "required" &&
              "placeholder:text-[#e00000]/50"
            }`}
            placeholder={
              errors?.title?.type === "required"
                ? errors.title.message
                : "Blog Title"
            }
          />
          <div
            className={`${
              fullScreen
                ? "absolute bg-white top-0 right-0 min-h-screen h-full w-full"
                : "h-[90vh] lg:h-[33vh] lg:mb-0 mb-36"
            }`}
          >
            <div className="bg-silver pl-1 mt-8 flex justify-between">
              <p className="uppercase font-medium">Blog</p>
              <button
                type="button"
                onClick={() => setFullScreen(!fullScreen)}
                className="bg-[#808080]/30 hover:bg-[#808080]/50 duration-100 p-1"
              >
                <BiExpand title="Full Screen" />
              </button>
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <div ref={quillRef} />
            </div>
          </div>
        </div>
        <div className="lg:w-7/12">
          <div className="lg:flex w-full justify-end hidden">
            <button
              type="submit"
              disabled={posting}
              className="uppercase bg-primary font-medium px-3 py-2 rounded text-white mb-5"
            >
              {posting ? "Posting..." : "Publish Blog"}
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
        </div>
      </form>
      {posting && (
        <div className="w-screen h-screen bg-white/40 fixed top-0 left-0 z-10 flex justify-center items-center">
          <p className="text-center text-4xl text-primary animate-bounce">
            Posting...
          </p>
        </div>
      )}
      {uploading && (
        <div className="w-screen h-screen bg-white/40 fixed top-0 left-0 z-10 flex justify-center items-center">
          <p className="text-center text-4xl text-primary animate-bounce">
            Uploading...
          </p>
        </div>
      )}
    </div>
  );
};

export default createpost;
