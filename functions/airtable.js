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
let recordID = " test";

exports.handler = async (event, context) => {
  const params = JSON.parse(event.body);
  base("Table 1").create(
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
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      //--> wie kann ich diese ID zurückgeben?
      recordID = record.getId();
      
    return {
        statusCode: 200,
        body: `helo ${recordID}`
    };
    }
  );

  return {
    statusCode: 200,
    body: `helo ${recordID}`
  };
};
