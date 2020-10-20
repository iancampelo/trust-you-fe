import axios from "axios";

export default axios.create({
  baseURL: "https://front-end-technical-test-api.integration.eu.cloud.trustyou.net/",
  responseType: "json"
});
