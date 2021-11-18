import { ChangeDeviceType } from "../../../frontend/src/index";
import {
  GetUserDevices,
  SignalingController,
} from "../../../frontend/src/index";

let roomName = "";

const videoEl = document.getElementById("myVideo") as HTMLVideoElement;
const remoteVideoEl = document.getElementById(
  "remoteVideo"
) as HTMLVideoElement;

const camToggle = document.getElementById("change-cam");
const micToggle = document.getElementById("change-mic");

const roomNameEl = document.getElementById("onRoomName");
const joinBtn = document.getElementById("join-btn");

const camDeviceList = document.getElementById("device-cam-list");
const micDeviceList = document.getElementById("device-mic-list");

let camStatus = true;
let micStatus = true;

const addLocalVideo = async (
  deviceId?: string,
  deviceType?: ChangeDeviceType
) => {
  const getDevice = await GetUserDevices.getDeviceStream(deviceId);

  if (!getDevice.isError) {
    const { stream } = getDevice;
    GetUserDevices.attachLocalVideo(videoEl, stream);
  }
  if (!deviceId) {
    SignalingController.joinRoom(roomName);
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
  camToggle.innerHTML = `cam-${camStatus}`;
  GetUserDevices.changeDeviceStatus("video", camStatus);
});

micToggle.addEventListener("click", () => {
  micStatus = !micStatus;
  micToggle.innerHTML = `mic-${micStatus}`;
  GetUserDevices.changeDeviceStatus("mic", micStatus);
});

// change device function
camDeviceList.addEventListener("input", (e: any) => {
  const { value } = e.target;
  addLocalVideo(value, "video");
});

micDeviceList.addEventListener("input", (e: any) => {
  const { value } = e.target;
  addLocalVideo(value, "mic");
});

// join
roomNameEl.addEventListener("input", (e: any) => {
  let { value } = e.target;
  roomName = value;
});

joinBtn.addEventListener("click", (e: any) => {
  e.preventDefault();
  console.log("current roomName", roomName);
  addLocalVideo();
});
