import axios from "axios";

const primaryAxios = axios.create({
  baseURL: "http://localhost:5000/",
});

export default primaryAxios;
