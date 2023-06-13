import useUsers from "@component/Hooks/useUsers";
import auth from "@component/firebase.init";
import userService from "@component/pages/api/userService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import Loader from "./Loader/Loader";
const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [users] = useUsers();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const existUser = users?.data?.data.filter(
        (u) => u?.email === user?.user?.email
      );
      if (existUser) {
        router.push("/");
      } else {
        (async () => {
          const { data } = await userService.put(`/create-user`, {
            name: user?.user?.displayName,
            email: user?.user?.email,
            photoUrl: user?.user?.photoURL,
          });
          if (data?.success) {
            router.push("/");
          }
        })();
      }
    }
  }, [user]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      {error && <p className="error my-5">{error?.code}</p>}
      <button
        onClick={() => signInWithGoogle()}
        type="button"
        className="w-full py-2 border border-silver shadow-md rounded flex items-center justify-center gap-4"
      >
        <FcGoogle className="text-2xl" />{" "}
        <p className="font-medium">Continue with Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
