import { io } from "socket.io-client";

const socket = io();

export default (function signaling() {
  console.log("signaling...", socket);
})();
