import axios from "axios";

//AXIOS GET 
export default {
  getContent (content) {
    return axios.get(`https://www.healthcare.gov/api/${content}.json`);
  }
}