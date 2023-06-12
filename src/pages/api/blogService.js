import axios from "axios";

const blogService = axios.create({
  baseURL: "https://motion-diary-server.vercel.app/api/v2/blogs/",
});

export default blogService;
