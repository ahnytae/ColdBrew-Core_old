const roomNameEl = document.getElementById("roomName");
const joinBtn = document.getElementById("join-information");

let roomName = "";

roomNameEl.addEventListener("input", (e: any) => {
  roomName = e.target.value;
});

joinBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  location.href = "/room";
});
