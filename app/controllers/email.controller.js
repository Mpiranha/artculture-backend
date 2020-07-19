const Email = require("../models/email.model.js");

// Create and Save a new Email
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Email
  const email = new Email({
    email: req.body.email
  });

  // Save Email in the database
  Email.create(email, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Email."
      });
    else res.send(data);
  });
};

//Export Emails to csv
exports.export = (req, res) => {
  Email.export((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
}