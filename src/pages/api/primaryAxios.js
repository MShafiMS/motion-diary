import axios from "axios";

const primaryAxios = axios.create({
  baseURL: "https://motion-diary.onrender.com/",
});

export default primaryAxios;
