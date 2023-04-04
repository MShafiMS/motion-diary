import auth from "@component/firebase.init";
import { useRouter } from "next/router";
import { Children } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function RequireAuth() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return router.push("/login");
  }

  return Children;
}
