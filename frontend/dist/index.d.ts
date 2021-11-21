declare class ColdBrew {
    protected constructor();
    private static MY_STREAM;
    private static ROOM_NAME;
    static get MyStream(): MediaStream;
    static set MyStream(stream: MediaStream);
    static get RoomName(): string;
    static set RoomName(roomName: string);
}

declare type ChangeDeviceType = 'video' | 'mic';
declare type GetMediaError = {
    isError: boolean;
    errorData?: {
        name: string;
        message?: string;
    };
    stream?: MediaStream;
};
declare type GetDeviceList = {
    isError: boolean;
    errorData?: {
        name: string;
        message?: string;
    };
    list?: MediaDeviceInfo[];
};

declare class GetUserDevices extends ColdBrew {
    private static readonly constraints;
    get currentVideoTrack(): MediaStreamTrack;
    static getDeviceStream(deviceId?: string): Promise<GetMediaError>;
    getAllDeviceLists(): Promise<MediaDeviceInfo[] | GetDeviceList>;
    static getSelectDeviceList(deviceType: ChangeDeviceType): Promise<MediaDeviceInfo[] | undefined>;
    static attachLocalVideo(videoEl: HTMLVideoElement, stream: MediaStream): Promise<void>;
    static changeDeviceStatus(deviceType: ChangeDeviceType, status: boolean): void;
}

declare class GetUserDevicesError extends Error {
}

declare class SignalingController extends ColdBrew {
    private static WS;
    private static myPeerConnection;
    private static readonly STUN_URL;
    private constructor();
    static init(): Promise<SignalingController>;
    static joinRoom(roomName: string, userName: string): Promise<void>;
    static attachRemoteVideo(remoteVideoEl: HTMLVideoElement): void;
    static connectSocket(roomName: string): void;
    static changeCamera(type: ChangeDeviceType): void;
}

export { ChangeDeviceType, ColdBrew, GetDeviceList, GetMediaError, GetUserDevices, GetUserDevicesError, SignalingController };
