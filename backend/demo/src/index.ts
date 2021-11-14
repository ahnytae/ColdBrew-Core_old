import { ColdBrew, GetMediaError, GetUserDevices } from "../../../frontend/src/index";

ColdBrew.init();

const videoEl = document.getElementById("myVideo") as HTMLVideoElement;
const camToggle = document.getElementById("change-cam");
const micToggle = document.getElementById("change-mic");

const camDeviceList = document.getElementById("device-cam-list");
const micDeviceList = document.getElementById("device-mic-list");

let camStatus = true;
let micStatus = true;

const addLocalVideo = (deviceId?: string) => {
  GetUserDevices.getDeviceStream(deviceId).then((device: GetMediaError) => {
    if (!device.isError) {
      GetUserDevices.attachMediaStream(videoEl, device.stream);
    }
  });
};
addLocalVideo();

const getMicList = GetUserDevices.getSelectDeviceList("mic");
getMicList.then((list) => {
  list.map((item: MediaDeviceInfo) => {
    const option = document.createElement("option");
    option.value = item.deviceId;
    option.innerHTML = item.label;
    camDeviceList.appendChild(option);
  });
});

const getCamList = GetUserDevices.getSelectDeviceList("video");
getCamList.then((list) => {
  list.map((item: MediaDeviceInfo) => {
    const option = document.createElement("option");
    option.value = item.deviceId;
    option.innerHTML = item.label;
    micDeviceList.appendChild(option);
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
  addLocalVideo(value);
});

micDeviceList.addEventListener("input", (e: any) => {
  const { value } = e.target;
  addLocalVideo(value);
});
