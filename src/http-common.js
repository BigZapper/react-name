import axios from "axios";

export default axios.create({
  baseURL: "https://tenhay-backend.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
