const roomNameEl = document.getElementById("roomName");
const userNameEl = document.getElementById("userName");

const joinBtn = document.getElementById("join-form");

let roomName = "";
let userName = "";

roomNameEl.addEventListener("input", (e: any) => {
  const { value } = e.target;
  roomName = value;
});
userNameEl.addEventListener("input", (e: any) => {
  const { value } = e.target;
  userName = value;
});

joinBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const requestJoin = await fetch(`/join/${roomName}/${userName}`, {
    method: "POST",
  });
  const res = await requestJoin.json();

  if (res.data === "SUCCESS") {
    location.href = "/room";
  }
});
