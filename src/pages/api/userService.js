import axios from "axios";

const userService = axios.create({
  baseURL: "http://localhost:5000/api/v2/users/",
});

export default userService;
