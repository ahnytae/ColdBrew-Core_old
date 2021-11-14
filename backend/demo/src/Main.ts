const roomNameEl = document.getElementById("roomName");
const join = document.getElementById("join");

let roomName = "";

roomNameEl.addEventListener("input", (e: any) => {
  roomName = e.target.value;
});
join.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState("roomName", "title", "/room");
});