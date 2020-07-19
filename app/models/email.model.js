const sql = require("./db.js");
// var os = require("os");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// constructor
const Email = function (value) {
    this.email = value.email;
};

Email.create = (newEmail, result) => {
    sql.query("SELECT email FROM emails WHERE email = ?", newEmail.email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length > 0) {
            if (res) {
                console.log(res.length);
                console.log("Email exist");
                console.log(res);
                result(null, { 
                    message: "You've subscribed already."
                })
                return;
            }
        }
        
        

        sql.query("INSERT IGNORE INTO emails SET ?", newEmail, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created customer: ", {
                id: res.insertId,
                ...newEmail
            });
            result(null, {
                id: res.insertId,
                ...newEmail,
                message: 'Your email was Added successfully'
            });
        });
    });
};

Email.export = (result) => {
    sql.query("SELECT * FROM emails", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const jsonData = JSON.parse(JSON.stringify(res));
        console.log("jsonData", jsonData);

        // TODO: export to CSV file
        const csvWriter = createCsvWriter({
            path: "emails.csv",
            header: [{
                    id: "id",
                    title: "id"
                },
                {
                    id: "email",
                    title: "email"
                }
            ]
        });

        csvWriter
            .writeRecords(jsonData)
            .then(() => {
                console.log("Write to email.csv successfully!")
                result(null, {
                    message: 'Your emails.csv file has been created successfully'
                })
            });



    });
};

module.exports = Email;