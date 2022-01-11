/**
 * require built in libraries
 */
const fs = require("fs");
const path = require("path");
const express = require("express");
//requiring express framework
const app = express();

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
 * index route
 */
app.get("/", (req, res) => {
  res.render("index", { title: "Index" });
});
/**
 * server that listens on port 3000
 */
app.listen(3000, () => console.log("PS Project Running on 3000!"));
