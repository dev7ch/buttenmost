require("dotenv").config();
const qs = require("qs");
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_KEY
});
const base = Airtable.base("appfpfjspgZ9LWcB2");
const airtableId = "";
const querystring = require("querystring");

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);
  let recordID = " test";
  await base("Table 1").create(
    {
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
  ).then(res => {
    console.log(res, 'response') // find getID in console log
    console.log(res.getId()) // check if desired result
    recordID = res.getId() // assing to var

  }).catch(e => {
    console.log(e, 'Error')
  })
  
  console.log(recordID)
  return {
    statusCode: 200,
    body: `helo ${recordID}`
  };
};
