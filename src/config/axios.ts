import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
