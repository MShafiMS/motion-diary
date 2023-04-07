import auth from "@component/firebase.init";
import primaryAxios from "@component/pages/api/primaryAxios";
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
        const { data } = await primaryAxios.get(
          `/user-role?email=${user?.email}`
        );
        setRole(data?.role);
        setRoleLoading(false);
        setUserName(data?.name);
        setUserData(data);
      })();
    }
  }, [user]);
  return [role, roleLoading, userName, userData];
};

export default useRole;
