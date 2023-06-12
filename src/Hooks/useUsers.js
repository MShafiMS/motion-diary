import userService from "@component/pages/api/userService";
import { useQuery } from "react-query";

const useUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () => userService.get("/"));
  return [users, isLoading, refetch];
};

export default useUsers;
