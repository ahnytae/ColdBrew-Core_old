export default class ColdBrew {
  constructor() {
    console.log('%c HELLO ColeBrew !!', 'color: hotpink; font-size:40px; background:black');
  }

  private static MY_STREAM: MediaStream;
  private static ROOM_NAME: string;

  static init(): ColdBrew {
    return new ColdBrew();
  }

  static get MyStream(): MediaStream {
    return ColdBrew.MY_STREAM;
  }
  static set MyStream(stream: MediaStream) {
    ColdBrew.MY_STREAM = stream;
  }

  public get RoomName(): string {
    return ColdBrew.ROOM_NAME;
  }
  public set RoomName(roomName: string) {
    ColdBrew.ROOM_NAME = roomName;
  }
}
