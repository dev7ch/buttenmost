const mailgun = require("mailgun-js");

exports.handler = function(event, context, callback) {
  const mg = mailgun({
    apiKey: "aa9f95815d1cf88b900a55121d5cd0d8-1d8af1f4-e5d57eb1",
    domain: "buttenmost.ch"
  });

  const data = {
    from: "Samuel <info@buttenmost.ch>",
    to: "shufschmid@gmail.com@musk.com",
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
