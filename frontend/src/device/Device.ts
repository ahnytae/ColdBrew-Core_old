type NormalConstraints = {
  video: boolean;
  audio: boolean;
};

type SelectDeviceIdConstraints = {
  video: { deviceId: { exact: string } };
  audio: boolean;
};
export type Constraints = NormalConstraints | SelectDeviceIdConstraints;

export type ChangeDeviceType = 'video' | 'mic';

export type GetMediaError = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  stream?: MediaStream;
};

export type GetDeviceList = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  list?: MediaDeviceInfo[];
};
