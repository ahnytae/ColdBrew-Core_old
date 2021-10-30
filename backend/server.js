const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const engines = require("consolidate");
const app = express();

// view 경로 설정
app.set("views", __dirname + "/demo/src/view");

// 화면 engine을 html로 설정
app.engine("html", engines.mustache);
app.set("view engine", "html");

// front routing
app.use("/demo/src", express.static(__dirname + "/demo/src"));
app.get("/", (req, res) => res.render("index"));
app.get("/*", (_, res) => res.redirect("/"));

app.listen(3000, () => console.log("localhost 3000!"));
