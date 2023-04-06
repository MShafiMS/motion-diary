import primaryAxios from "@component/pages/api/primaryAxios";
import { useQuery } from "react-query";

const useUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () => primaryAxios.get(`/users`));
  return [users, isLoading, refetch];
};

export default useUsers;
