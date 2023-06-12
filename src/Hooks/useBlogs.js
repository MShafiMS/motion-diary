import blogService from "@component/pages/api/blogService";
import { useQuery } from "react-query";

const useBlogs = () => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery(["blogs"], () => blogService.get(`/`));
  return [blogs, isLoading, refetch];
};

export default useBlogs;
