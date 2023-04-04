const Blog = ({ blog }) => {
  return (
    <div>
      <img src={blog?.img} alt="" />
      <p className="text-xs text-center py-6">
        <span className="italic">in</span>{" "}
        <span className="text-primary uppercase">{blog?.category}</span>
      </p>
      <h1 className="text-center text-xl font-bold">{blog?.title}</h1>
      <p className="text-center py-5 text-xs uppercase italic text-[#808080]">
        {blog?.date}
      </p>
      <p className="text-xs text-[#808080] text-justify">
        {blog?.description.slice(0, 400)}...
      </p>
    </div>
  );
};

export default Blog;
