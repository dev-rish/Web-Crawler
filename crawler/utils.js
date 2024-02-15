const axios = require("axios");

const fetchData = (config) => {
  return axios(config)
    .then(({ data }) => data)
    .catch((error) => {
      if (error.response) {
        console.log(
          `Request failed: URL-${config.url} | Status-${error.response.status}`
        );
      } else if (error.request) {
        console.log(`Unable to reach ${config.url}`);
      } else {
        //  Wrong config
        console.log("Error", error.message);
      }

      return {};
    });
};

module.exports = {
  fetchData,
};
