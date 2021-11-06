import { Constraints, GetMediaError, GetDeviceList } from './DeviceController';

export class GetUserDevices {
  private static myStream: MediaStream;
  private static readonly constraints: Constraints = {
    audio: true,
    video: true,
  };

  get currentVideoTrack(): MediaStreamTrack {
    return GetUserDevices.myStream.getVideoTracks()[0];
  }

  static async getDeviceStream(deviceId?: string): Promise<MediaStream | GetMediaError> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        !deviceId ? GetUserDevices.constraints : { audio: true, video: { deviceId: { exact: deviceId } } }
      );
      if (stream) {
        this.myStream = stream;
        return {
          isError: false,
          stream: stream,
        };
      } else {
        return {
          isError: true,
          errorData: {
            name: 'get media failed',
          },
        };
      }
    } catch (e) {
      if (e instanceof DOMException) {
        return {
          isError: true,
          errorData: {
            name: e.name,
            message: e.message,
          },
        };
      } else {
        return {
          isError: true,
          errorData: {
            name: 'exception failed',
          },
        };
      }
    }
  }

  static async getDeviceLists(): Promise<MediaDeviceInfo[] | GetDeviceList> {
    try {
      const list = await navigator.mediaDevices.enumerateDevices();
      if (list) {
        return {
          isError: false,
          list: list,
        };
      } else {
        return {
          isError: true,
          errorData: {
            name: 'get Media Lists failed',
          },
        };
      }
    } catch (e) {
      return {
        isError: true,
        errorData: {
          name: 'enumeration fails',
        },
      };
    }
  }

  static async attachMediaStream(videoEl: HTMLVideoElement, stream: MediaStream) {
    try {
      videoEl.srcObject = stream;
    } catch {
      console.error('%c [fail] type check video Element or stream', 'color: red');
    }
  }

  static muteMic(stream: MediaStream): void {
    try {
      stream.getAudioTracks().map((audioTrack: MediaStreamTrack) => (audioTrack.enabled = !audioTrack.enabled));
    } catch {
      console.log('%c [fail] failed mute Mic', 'color: red');
    }
  }

  static onOffCamera(stream: MediaStream): void {
    try {
      stream.getVideoTracks().map((videoTrack: MediaStreamTrack) => (videoTrack.enabled = !videoTrack.enabled));
    } catch {
      console.log('%c [fail] failed mute Mic', 'color: red');
    }
  }
}
