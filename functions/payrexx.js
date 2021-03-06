require("dotenv").config();
const qs = require("qs");
const axios = require("axios");
const Base64 = require("crypto-js/enc-base64");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const baseUrl = "https://api.payrexx.com/v1.0/";

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_KEY
});
const base = Airtable.base("appfpfjspgZ9LWcB2");

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

  const params = JSON.parse(event.body);
  const output = JSON.stringify(params);
  // where you want to consume the payrexx module:
  const payrexx = this.init("buttenmost", secret);
base("Table 1").create(
    [
      {
        fields: {
          Email: params.email,
          Vorname: params.forename,
          Betrag: params.Preis,
          Name: params.surname,
          Adresse: params.street,
          PLZ: params.postcode,
          Ort: params.place,
          Menge: params.zahl,
          Versanddatum: params.versanddatum,
          Status: "bestellt"
        }
      }
    ],
    function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      return(records[0].getId());
    }

  );
  
  const response = await payrexx.createGateway({
    amount: params.Preis * 100,
    failedRedirectUrl:
      "https://sleepy-fermat-654198.netlify.app/fehler/?fehler=abgelehnt&kunde=" +
      params.email,
    cancelRedirectUrl:
      "https://sleepy-fermat-654198.netlify.app/fehler/?fehler=abgebrochen&kunde=" +
      params.email,
    successRedirectUrl:
      "https://sleepy-fermat-654198.netlify.app/danke?kunde=" + params.email,
    // add more fields here
  });

  

  //if (response.status === 200) {
  const gateway = JSON.stringify(response.data.data[0]);
  // here you will get the gateway
  //}
  return {
    statusCode: 200,
    body: `${response.data.data[0].link}`
  };
};
