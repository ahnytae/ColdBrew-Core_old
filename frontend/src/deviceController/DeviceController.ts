type NormalConstraints = {
  video: boolean;
  audio: boolean;
};

type SelectDeviceIdConstraints = {
  video: { deviceId: { exact: string } };
  audio: boolean;
};

export type Constraints = NormalConstraints | SelectDeviceIdConstraints;

export type GetMediaError = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  stream?: MediaStream;
};

export type GetMediaLists = {
  isError: boolean;
  errorData?: {
    name: string;
    message?: string;
  };
  lists?: MediaDeviceInfo[];
};
