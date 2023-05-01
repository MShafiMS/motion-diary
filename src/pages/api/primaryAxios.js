import axios from "axios";

const primaryAxios = axios.create({
  baseURL: "https://motion-diary-server.vercel.app/",
});

export default primaryAxios;
