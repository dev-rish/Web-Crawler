const axios = require("axios");

const fetchData = (config) => {
  return axios(config)
    .then(({ data }) => data)
    .catch(({ response, request }) => {
      if (response) {
        console.log(
          `Request failed: URL-${config.url} | Status-${response.status}`
        );
      } else if (request) {
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
