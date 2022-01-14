/**
 * require built in libraries
 */
const fs = require("fs");
const path = require("path");
const express = require("express");
const { json } = require("express/lib/response");
//requiring express framework
const app = new express();

/**
 * configure view directory and engine
 */
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

/**
 * configure the static directory. Pointing express to our css/js. Serves resources from our public folder.
 */
app.use(express.static(path.join(__dirname + "/public")));
/**
 * adding express middleware to handle POST data - handling form data
 */
app.use(express.urlencoded({ extended: true }));

// /**
//  * To read account data
//  */
// const accountData = fs.readFileSync(
//   path.join(__dirname, "json", "accounts.json"),
//   "utf8"
// );
// const accounts = JSON.parse(accountData);
// /**
//  * Read user data
//  */
// const userData = fs.readFileSync(path.join(__dirname, 'json', "users.json"), "utf-8");
// const users = JSON.parse(userData);

// /**
//  * checking acc route
//  */
// app.get("/checking", (req, res) => {
//   res.render("account", { account: "checking" });
// });
// /**
//  * credit acc route
//  */
// app.get("/credit", (req, res) => {
//   res.render("account", { account: "credit" });
// });

/**
 * index route
 */
app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

/**
 * profile route
 */
app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

/**
 * savings acc route
 */
app.get("/savings", (req, res) => {
  res.render("account", { account: "savings" });
});

/**
 * Payment feature GET route - handling form data
 */
app.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

/**
 * Payment feature POST route - handling form data
 */
app.post("/payment", (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render("payment", {
    message: "payment successful",
    account: accounts.credit,
  });
});

/**
 * transfer POST route - handling form data
 */
app.post("/transfer", (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount, 10);
  writeJSON();
  res.render("transfer", { message: "Transfer completed" });
});

/**
 * server that listens on port 3000
 */
app.listen(3000, () => console.log("Project Running on 3000!"));
