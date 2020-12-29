import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
//protected route ki line ha ye see video 181
//bidirectional dependency khatam krny ky liye is line ko transfer kiya ha function main;
//pechy sy token aye ga wo idar set kar dain gy
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //raven used to log unexpected error
    logger.log(error);
    toast.error("unexpected error occur");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  setJwt,
};
