require('dotenv').config()
const qs = require('qs')
const axios = require('axios')
const Base64 = require('crypto-js/enc-base64')
const hmacSHA256 = require('crypto-js/hmac-sha256')
const baseUrl = 'https://api.payrexx.com/v1.0/?instance=buttenmost'

const querystring = require("querystring");

// payrexx.js module content:
const secret = process.env.PAYREXX_SECRET_KEY

exports.handler = async (event, context) => {
  
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const name = params.surname || "World";

  function buildSignature (query = 'form-name=bestellung&forename=&surname=hufi&street=&postcode=&place=&mail=&text=&Liter=4&Preis=38&Porto=9') {
    return Base64.stringify(hmacSHA256(query, secret))
  }
  
  let queryParams = Object.assign({}, params)
  const queryStr = qs.stringify(queryParams)
  queryParams.ApiSignature = buildSignature(queryStr)

  return {
    statusCode: 200,
    body: `Hello, ${name}, ${queryStr},${queryParams.ApiSignature}`,
  };
};