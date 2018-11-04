import axios from "axios";

export default {

  getContent: function(content) {
    return axios.get(`https://www.healthcare.gov/api/${content}.json`);
  }
}