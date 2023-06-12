import axios from "axios";

const userService = axios.create({
  baseURL: "https://motion-diary-server.vercel.app/api/v2/users/",
});

export default userService;
