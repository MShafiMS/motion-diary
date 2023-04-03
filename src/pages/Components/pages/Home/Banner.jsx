import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { Navigation, Pagination } from "swiper";

const Banner = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="mx-14 my-10"
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
        <SwiperSlide>
          <div className="h-[60vh] relative w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1680500055774-7185391be33d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)]">
            {/* overlay */}
            <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
            {/* navigation */}
            <button
              className={`absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              className={`absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltRight />
            </button>
            <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
              <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                Creative
              </button>
              <a
                href="#"
                className="text-4xl max-w-lg duration-300 font-bold hover:underline"
              >
                Creative Diy Hobby. Making Handmade Craft Christmas Balls
              </a>
              <p className="uppercase text-xs italic">December 05, 2016</p>
              <button className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase">
                Continue Reading
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[60vh] relative w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1674426201734-8821bbb2b989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)]">
            {/* overlay */}
            <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
            {/* navigation */}
            <button
              className={`absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              className={`absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltRight />
            </button>
            <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
              <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                Creative
              </button>
              <a
                href="#"
                className="text-4xl max-w-lg duration-300 font-bold hover:underline"
              >
                Creative Diy Hobby. Making Handmade Craft Christmas Balls
              </a>
              <p className="uppercase text-xs italic">December 05, 2016</p>
              <button className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase">
                Continue Reading
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[60vh] relative w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1668420272163-9f8ee8a4f9ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">
            {/* overlay */}
            <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
            {/* navigation */}
            <button
              className={`absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              className={`absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltRight />
            </button>
            <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
              <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                Creative
              </button>
              <a
                href="#"
                className="text-4xl max-w-lg duration-300 font-bold hover:underline"
              >
                Creative Diy Hobby. Making Handmade Craft Christmas Balls
              </a>
              <p className="uppercase text-xs italic">December 05, 2016</p>
              <button className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase">
                Continue Reading
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[60vh] relative w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1679485070274-2312d46faaee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)]">
            {/* overlay */}
            <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
            {/* navigation */}
            <button
              className={`absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              className={`absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltRight />
            </button>
            <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
              <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                Creative
              </button>
              <a
                href="#"
                className="text-4xl max-w-lg duration-300 font-bold hover:underline"
              >
                Creative Diy Hobby. Making Handmade Craft Christmas Balls
              </a>
              <p className="uppercase text-xs italic">December 05, 2016</p>
              <button className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase">
                Continue Reading
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[60vh] relative w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1680435438016-bd477f1f3ca2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">
            {/* overlay */}
            <div className="w-full h-full bg-gradient-to-t from-black/70 absolute top-0 left-0" />
            {/* navigation */}
            <button
              className={`absolute left-6 custom-swiper-button-prev text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltLeft />
            </button>
            <button
              className={`absolute right-6 custom-swiper-button-next text-white border-2 hover:bg-primary hover:border-primary duration-300 z-20 p-3 rounded-full top-1/2 -translate-y-1/2 ${
                isHover ? "opacity-1000" : "opacity-0"
              }`}
            >
              <FaLongArrowAltRight />
            </button>
            <div className="text-white h-full w-full absolute z-10 top-0 left-0 flex flex-col gap-6 items-center justify-center">
              <button className="text-xs font-medium uppercase bg-primary px-2 py-1">
                Creative
              </button>
              <a
                href="#"
                className="text-4xl max-w-lg duration-300 font-bold hover:underline"
              >
                Creative Diy Hobby. Making Handmade Craft Christmas Balls
              </a>
              <p className="uppercase text-xs italic">December 05, 2016</p>
              <button className="border-white border px-5 hover:bg-primary hover:border-primary duration-500 py-3 text-xs uppercase">
                Continue Reading
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
