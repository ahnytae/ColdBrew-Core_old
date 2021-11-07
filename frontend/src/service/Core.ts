export class ColdBrew {
  constructor() {
    console.log('%c HELLO ColeBrew !!', 'color: hotpink; font-size:40px; background:black');
  }

  private static MY_STREAM: MediaStream;
  private static ROOM_NAME: string;

  protected get MyStream(): MediaStream {
    return ColdBrew.MY_STREAM;
  }
  protected set MyStream(stream: MediaStream) {
    ColdBrew.MY_STREAM = stream;
  }

  protected get RoomName(): string {
    return ColdBrew.ROOM_NAME;
  }
  protected set RoomName(roomName: string) {
    ColdBrew.ROOM_NAME = roomName;
  }
}
