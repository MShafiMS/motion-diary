import auth from "@component/firebase.init";
import userService from "@component/pages/api/userService";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const [userData, setUserData] = useState("");

  const fetchRoleData = async () => {
    if (user) {
      try {
        const { data } = await userService.get(
          `/user-role?email=${user?.email}`
        );
        setRole(data?.data?.role);
        setUserData(data?.data);
      } catch (error) {
        // Handle error if needed
      }
    }
    setRoleLoading(false);
  };

  useEffect(() => {
    fetchRoleData();
  }, [user]);

  const refetch = () => {
    fetchRoleData();
  };
  return [role, roleLoading, userData, refetch];
};

export default useRole;
