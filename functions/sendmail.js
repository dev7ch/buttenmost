const mailgun = require("mailgun-js");

exports.handler = function(event, context, callback) {
  const mg = mailgun({
    apiKey: "key-5545fd16a12f56a3f282efc23bea75fb",
    domain: "sandboxd86c42804fa142eaa48ce3644961f3c2.mailgun.org"
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
