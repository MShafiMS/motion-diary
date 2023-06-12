import auth from "@component/firebase.init";
import userService from "@component/pages/api/userService";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useRole = () => {
  const [user] = useAuthState(auth);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      (async () => {
        const { data } = await userService.get(
          `/user-role?email=${user?.email}`
        );
        setRole(data?.data?.role);
        setRoleLoading(false);
        setUserName(data?.data.name);
        setUserData(data?.data);
      })();
    }
  }, [user]);
  return [role, roleLoading, userName, userData];
};

export default useRole;
