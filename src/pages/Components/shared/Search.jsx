import { useBlogContext } from "@component/Hooks/BlogsContext";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Search = () => {
  const [search, setSearch] = useState("");
  const { blogs, isLoading, refetch } = useBlogContext();
  const searched = blogs?.data?.filter((s) =>
    s.title.toLowerCase().includes(search)
  );
  return (
    <div className="relative">
      <div className="relative lg:w-72 w-56">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => setSearch(e.target.value)}
          className="w-full bg-silver py-1 rounded pl-8 pr-2 placeholder:uppercase outline-none focus:outline-none"
          placeholder="Search Blogs"
        />
        <FiSearch className="text-neutral absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
      {search && (
        <div className="lg:w-[65vh] w-80 left-0 h-max top-10 rounded-lg lg:-left-20 bg-white absolute z-30 p-2">
          <div className="border border-silver rounded h-full">
            <div className="flex justify-between py-1 text-neutral mx-2">
              <h1 className="text-lg font-medium uppercase">Search</h1>
              <button
                onClick={() => setSearch("")}
                className="text-lg bg-silver px-1 rounded hover:bg-primary duration-200 hover:text-white"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="px-2">
              {searched?.length ? (
                <>
                  {searched?.map((blog, idx) => (
                    <Link
                      href={`/blog/${blog?._id}`}
                      key={idx}
                      className="py-2 border-t border-silver flex gap-2"
                    >
                      <img
                        src={blog?.img}
                        className="w-24 h-14 object-cover object-center"
                        alt=""
                      />
                      <div>
                        <h1 className="font-medium">{blog?.title}</h1>
                        <p className="uppercase text-sm">
                          In{" "}
                          <span className="text-primary">{blog?.category}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <p className="text-center border-t border-silver py-6 text-neutral">
                  no search founds
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
