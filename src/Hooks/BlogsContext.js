import blogService from "@component/pages/api/blogService";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const BlogContext = createContext({
  blogs: [],
  isLoading: false,
  refetch: undefined,
});

export const BlogsProvider = ({ children, initialData }) => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery(["blogsss"], async () => await blogService.get(`/`), {
    initialData: initialData || undefined,
  });

  return (
    <BlogContext.Provider value={{ blogs, isLoading, refetch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
