import { Constraints, GetMediaError, GetMediaLists } from './DeviceController';

export default class GetUserDevices {
  static async getDeviceAllow(constraints: Constraints): Promise<MediaStream | GetMediaError> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (stream) {
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

  static async getDeviceLists(): Promise<MediaDeviceInfo[] | GetMediaLists> {
    try {
      const lists = await navigator.mediaDevices.enumerateDevices();
      if (lists) {
        return {
          isError: false,
          lists: lists,
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
}
