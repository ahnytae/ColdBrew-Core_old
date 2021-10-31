export type Constraints = {
  video: boolean;
  audio: boolean;
};

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
