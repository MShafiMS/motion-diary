import Head from "next/head";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
const createpost = () => {
  const { quill, quillRef } = useQuill();
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setDescription(quill.getText());
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  return (
    <div className="mx-8 text-neutral">
        <Head>
            <title>Create Blog Post</title>
        </Head>
      <form className="flex my-6">
        <div className="w-full">
          <h1 className="text-3xl font-semibold uppercase mb-6">
            Create Your Blog
          </h1>
          <input
            type="text"
            className="bg-silver p-3 w-full text-lg outline-none focus:outline-none rounded-md font-semibold"
            placeholder="Blog Title"
          />
          <div className="my-6">
            <p className="uppercase font-medium">Blog Category</p>
            <select
              name="category"
              id=""
              className="uppercase font-medium outline-none focus:outline-none px-3 rounded bg-primary text-white mt-2"
            >
              <option value="Life Style">Life Style</option>
              <option value="Life Style">Travel</option>
              <option value="Life Style">Sports</option>
              <option value="Life Style">Creative</option>
              <option value="Life Style">Diy</option>
              <option value="Life Style">Food</option>
              <option value="Life Style">Fashion</option>
            </select>
          </div>
          <p className="uppercase font-medium">Description</p>
          <div style={{ width: "100%", height: 300 }}>
            <div ref={quillRef} />
          </div>
        </div>
        <div className="w-7/12">
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="uppercase bg-neutral font-medium px-3 py-2 rounded text-white"
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default createpost;
