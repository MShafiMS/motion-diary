import auth from "@component/firebase.init";
import userService from "@component/pages/api/userService";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useRole = () => {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (user?.email) {
      (async () => {
        const { data } = await userService.get(
          `/user-role?email=${user?.email}`
        );
        setRole(data?.data?.role);
        setRoleLoading(false);
        setUserData(data?.data);
      })();
    }
  }, [user]);
  return [role, roleLoading, userData];
};

export default useRole;
