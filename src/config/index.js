import axios from "axios";

let baseURL;
if (process.env.NODE_ENV == "development") {
  baseURL = `http://${location.hostname}:8088/api/v1`;
  //baseURL = `https://freshmyanmar.com/api/v1`;
  //baseURL = `http://localhost:8088/api/v1`
} else {
  //baseURL = `//${location.hostname}:${location.port}/api/v1`;
  baseURL = `https://www.freshmyanmar.com/api/v1`;
}
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { "info-client": "freshmm" },
});
export default instance;
