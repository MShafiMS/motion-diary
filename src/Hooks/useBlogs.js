import primaryAxios from "@component/pages/api/primaryAxios";
import { useQuery } from "react-query";

const useBlogs = () => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useQuery(["blogs"], () => primaryAxios.get(`/blogs`));
  return [blogs, isLoading, refetch];
};

export default useBlogs;
