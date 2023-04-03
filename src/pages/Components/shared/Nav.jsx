import Link from "next/link";
import Logo from "../images/Logo";

const Nav = () => {
  return (
    <div>
      <Logo />
      <div className="text-neutral border-t border-silver shadow-lg px-8 flex items-center w-full justify-between">
        <div className="text-xs font-medium tracking-wider py-5 w-full">
          <ul className="flex items-center justify-start gap-10 uppercase">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Features</Link>
            </li>
            <li>
              <Link href="#">Life Style</Link>
            </li>
            <li>
              <Link href="#">Travel</Link>
            </li>
            <li>
              <Link href="#">Sports</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
        </div>
        {/* <div className="py-5 w-full">
          <button>
            <BiSearch />
          </button>
        </div> */}
        <div className="text-sm uppercase py-3 font-medium w-2/12 flex gap-3 justify-end">
          <Link
            href="register"
            className="bg-primary rounded-sm text-white px-3 py-1"
          >
            Register
          </Link>
          <Link
            href="login"
            className="bg-black rounded-sm text-white px-3 py-1"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
