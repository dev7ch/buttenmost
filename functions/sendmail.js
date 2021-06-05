const mailgun = require("mailgun-js");
const { MG_API_KEY: apiKey, MG_DOMAIN: domain } = process.env;
exports.handler = function(event, context, callback) {
  const mg = mailgun({
    apiKey: apiKey,
    domain: domain
  });

  const data = {
    from: "Samuel <info@sandboxd86c42804fa142eaa48ce3644961f3c2.mailgun.org>",
    to: "shufschmid@gmail.com",
    subject: "Nur ein Test",
    text: "mal schauen, ob es klappt.",
    html: "HTML"
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      return console.log(error);
    }

    callback(null, {
      statusCode: 200,
      body: "Mail sent"
    });
  });
};
