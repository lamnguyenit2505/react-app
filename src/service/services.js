import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
      "access-control-allow-origin" : "*",
      'content-type': 'application/json',
  }
})

export default axiosClient