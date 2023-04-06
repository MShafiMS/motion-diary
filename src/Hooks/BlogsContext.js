import primaryAxios from "@component/pages/api/primaryAxios";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const BlogContext = createContext({
  blogs: [],
  isLoading: false,
  refetch: undefined,
});

export const BlogsProvider = ({ children }) => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery(["blogsss"], () => primaryAxios.get(`/blogs`));
  return (
    <BlogContext.Provider value={{ blogs, isLoading, refetch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
