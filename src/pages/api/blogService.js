import axios from "axios";

const blogService = axios.create({
  baseURL: "http://localhost:5000/api/v2/blogs/",
});

export default blogService;
