const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const engines = require("consolidate");
const app = express();

const httpServer = http.createServer(app);
const ioServer = SocketIO(httpServer);

// view 경로 설정
app.set("views", __dirname + "/demo/dist");

// 화면 engine을 html로 설정
app.engine("html", engines.mustache);
app.set("view engine", "html");

// front routing
app.use(express.static(__dirname + "/demo/dist"));
app.get("/", (req, res) => res.render("main"));
app.get("/room", (req, res) => res.render("room"));
app.get("/*", (_, res) => res.redirect("/"));

httpServer.listen(3000, () => console.log("start server"));

// socket server
let ROOM_NAME = "";
ioServer.on("connection", (socket) => {
  console.log("connect socket server");

  socket.on("join-room", (roomName) => {
    ROOM_NAME = roomName;
    socket.join(roomName);
    socket.to(ROOM_NAME).emit("success-join");
  });

  // received offer
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });

  // received answer
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });

  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("icecandidate", ice);
  });
});

/** 
    @params roomName:
  */
