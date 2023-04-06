import {
    FaFacebookF,
    FaGooglePlusG,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import Logo from "../images/Logo";

const Footer = () => {
  return (
    <div className="">
      <Logo width="200" />
      <div className="py-6 px-8 bg-silver/40 flex items-center justify-between">
        <p className="text-xs text-neutral">
          All rights reserved @ Motion Diary - {new Date().getFullYear()}, by
          Muhammad Shafi
        </p>
        <div className="flex items-center justify-end gap-3 text-sm">
          <button className="bg-[#808080]/30 hover:bg-primary/60 text-neutral hover:text-white duration-500 p-2 rounded-full">
            <FaFacebookF />
          </button>
          <button className="bg-[#808080]/30 hover:bg-primary/60 text-neutral hover:text-white duration-500 p-2 rounded-full">
            <FaTwitter />
          </button>
          <button className="bg-[#808080]/30 hover:bg-primary/60 text-neutral hover:text-white duration-500 p-2 rounded-full">
            <FaGooglePlusG />
          </button>
          <button className="bg-[#808080]/30 hover:bg-primary/60 text-neutral hover:text-white duration-500 p-2 rounded-full">
            <FaLinkedinIn />
          </button>
          <button className="bg-[#808080]/30 hover:bg-primary/60 text-neutral hover:text-white duration-500 p-2 rounded-full">
            <FaInstagram />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
