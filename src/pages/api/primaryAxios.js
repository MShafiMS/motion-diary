import axios from "axios";

const primaryAxios = axios.create({
  baseURL: "http://localhost:5001/",
});

export default primaryAxios;
