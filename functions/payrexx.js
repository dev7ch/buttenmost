require("dotenv").config();
const qs = require("qs");
const axios = require("axios");
const Base64 = require("crypto-js/enc-base64");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const baseUrl = "https://api.payrexx.com/v1.0/";

const querystring = require("querystring");

// payrexx.js module content:
const secret = process.env.PAYREXX_SECRET_KEY;


exports.init = function(instance, secret) {
  function buildSignature(query = "") {
    return Base64.stringify(hmacSHA256(query, secret));
  }

  function buildBaseUrl(path) {
    return baseUrl + path + "?instance=" + instance;
  }

  return {
    getGateway: function(id) {
      const baseUrl = buildBaseUrl("Gateway/" + id + "/");
      const url = baseUrl + "&ApiSignature=" + buildSignature();
      return axios.get(url);
    },
    createGateway: function(params) {
      if (!params.amount) {
        throw new Error("Amount required!");
      }

      const defaultParams = {
        currency: "CHF"
      };

      let queryParams = Object.assign({}, defaultParams, params);

      const queryStr = qs.stringify(queryParams);
      const signature = buildSignature(queryStr);

      queryParams.ApiSignature = signature;
      const queryStrSigned = qs.stringify(queryParams);

      const baseUrl = buildBaseUrl("Gateway/");
      return axios.post(baseUrl, queryStrSigned);
    }
  };
};

exports.handler = async (event, context) => {
  const params = querystring.parse(event.body);
  const output = JSON.stringify(params)
  const name = params.surname || "World";
  // where you want to consume the payrexx module:
  const payrexx = this.init("buttenmost", secret);
  
  const response = await payrexx.createGateway({
    amount: params.Preis*100,
    // add more fields here
  })

  //if (response.status === 200) {
    const gateway = JSON.stringify(response.data.data[0])
    
    // here you will get the gateway
  //}
  return {
    statusCode: 200,
    body: `Hallo ${params.forename}, hier kommt der Link zum Zahlen: ${response.data.data[0].link} .............................................................................................................................. ${output} ......................................................................... ${gateway} `,
  };


};
