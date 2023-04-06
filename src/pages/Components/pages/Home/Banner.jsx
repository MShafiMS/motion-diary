import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useBlogContext } from "@component/Hooks/BlogsContext";
import Link from "next/link";
import { useState } from "react";
import { Navigation, Pagination } from "swiper";
import Loader from "../../shared/Loader/Loader";

const Banner = () => {
  const [isHover, setIsHover] = useState(false);
  const { blogs, isLoading, refetch } = useBlogContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="lg:mx-14 mx-5 lg:my-10 my-5"
    >
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {blogs?.data?.slice(0, 5).map((blog) => (
          <>
            {blog?.approve && (
              <SwiperSlide key={blog?._id}>
                <div
                  className="h-[60vh] relative w-full"
                  style={{
                    backgroundImage: `url(${blog?.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* overlay */}
                  <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
                  {/* navigation */}
                  <button
                    className={`lg:block hidden absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                      isHover ? "opacity-1000" : "opacity-0"
                    }`}
                  >
                    <FaLongArrowAltLeft />
                  </button>
                  <button
                    className={`lg:block hidden absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                      isHover ? "opacity-1000" : "opacity-0"
                    }`}
                  >
                    <FaLongArrowAltRight />
                  </button>
                  <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
                    <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                      {blog?.category}
                    </button>
                    <a
                      href="#"
                      className="lg:text-4xl text-xl max-w-lg duration-300 font-bold hover:underline"
                    >
                      {blog?.title}
                    </a>
                    <p className="uppercase text-xs italic">{blog?.date}</p>
                    <Link
                      href={`/blog/${blog?._id}`}
                      className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
