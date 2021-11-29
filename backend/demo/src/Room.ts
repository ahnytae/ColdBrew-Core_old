import { ChangeDeviceType } from "../../../frontend/src/index";
import { GetUserDevices, SignalingController } from "../../../frontend/src/index";

const videoEl = document.getElementById("myVideo") as HTMLVideoElement;
const remoteVideoEl = document.getElementById("remoteVideo") as HTMLVideoElement;

const camToggle = document.getElementById("change-cam");
const micToggle = document.getElementById("change-mic");

const showDeviceList = document.getElementById("device-list");
const closeDeviceList = document.getElementById("device-select-close");

const onClickDeviceSelect = document.getElementById("device-select");
const camDeviceList = document.getElementById("device-cam-list");
const micDeviceList = document.getElementById("device-mic-list");

const leaveRoomBtn = document.getElementById("leave-btn");

let camStatus = true;
let micStatus = true;

const fetchJoin = async () => {
  const res = await fetch("/join");
  const data = await res.json();
  return data;
};

const addLocalVideo = async (deviceId?: string, deviceType?: ChangeDeviceType) => {
  const getDevice = await GetUserDevices.getDeviceStream(deviceId);

  if (!getDevice.isError) {
    const { stream } = getDevice;
    GetUserDevices.attachLocalVideo(videoEl, stream);
  }
  if (!deviceId) {
    const roomInfo = await fetchJoin();
    const { roomName, userName } = roomInfo;
    SignalingController.joinRoom(roomName, userName);
    SignalingController.attachRemoteVideo(remoteVideoEl);
  }

  if (deviceType) {
    if (deviceType === "video") {
      SignalingController.changeCamera("video");
      return;
    } else if (deviceType === "mic") {
      SignalingController.changeCamera("mic");
      return;
    }
  }
};

const getMicList = GetUserDevices.getSelectDeviceList("mic");
getMicList.then((list) => {
  list.map((item: MediaDeviceInfo) => {
    const option = document.createElement("option");
    option.value = item.deviceId;
    option.innerHTML = item.label;
    micDeviceList.appendChild(option);
  });
});

const getCamList = GetUserDevices.getSelectDeviceList("video");
getCamList.then((list) => {
  console.log("## camList", list);
  list.map((item: MediaDeviceInfo) => {
    const option = document.createElement("option");
    option.value = item.deviceId;
    option.innerHTML = item.label;
    camDeviceList.appendChild(option);
  });
});

// cam, mic on/off
camToggle.addEventListener("click", () => {
  camStatus = !camStatus;
  camToggle.innerHTML = `cam-${!camStatus ? "off" : "on"}`;
  GetUserDevices.changeDeviceStatus("video", camStatus);
});

micToggle.addEventListener("click", () => {
  micStatus = !micStatus;
  micToggle.innerHTML = `mic-${!micStatus ? "off" : "on"}`;
  GetUserDevices.changeDeviceStatus("mic", micStatus);
});

// change device function
showDeviceList.hidden = true;

onClickDeviceSelect.addEventListener("click", () => {
  showDeviceList.hidden = showDeviceList.hidden === false ? true : false;
});

closeDeviceList.addEventListener("click", () => {
  showDeviceList.hidden = true;
});

camDeviceList.addEventListener("input", (e: any) => {
  const { value } = e.target;
  addLocalVideo(value, "video");
});

micDeviceList.addEventListener("input", (e: any) => {
  const { value } = e.target;
  addLocalVideo(value, "mic");
});

// leave room
leaveRoomBtn.addEventListener("click", () => {
  SignalingController.leaveRoomHandler(videoEl);
  alert("종료 되었습니다.");

  setTimeout(() => {
    location.href = "exit";
  }, 500);
});

window.addEventListener("load", () => {
  addLocalVideo();
});
