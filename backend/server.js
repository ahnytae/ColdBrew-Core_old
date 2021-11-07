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
app.get("/", (req, res) => res.render("index"));
app.get("/*", (_, res) => res.redirect("/"));

httpServer.listen(3000, () => console.log("start server"));

// socket server
const ROOM_NAME;
ioServer.on("connection", (socket) => {
  console.log("connect socket server");

  socket.on("join-room", (roomName, cb) => {
    if(typeof cb !== 'function') {
      console.error('cb is not function');
    }

    ROOM_NAME = roomName;
    cb && cb();
    socket.to(ROOM_NAME).emit('success-join')
  });
 
  // receive offer
  socket.on('offer', (offer, roomName) => {
    socket.io(roomName).emit('%c [receive offer]',offer, 'color: pink');
  })
});

/** 
    @params roomName:
  */
