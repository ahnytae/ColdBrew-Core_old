export class ColdBrew {
  constructor() {
    console.log('%c HELLO ColeBrew !!', 'color: hotpink; font-size:40px; background:black');
  }

  private static MY_STREAM: MediaStream;
  private static ROOM_NAME: string;

  get MyStream(): MediaStream {
    return ColdBrew.MY_STREAM;
  }
  set MyStream(stream: MediaStream) {
    ColdBrew.MY_STREAM = stream;
  }

  get RoomName(): string {
    return ColdBrew.ROOM_NAME;
  }
  set RoomName(roomName: string) {
    ColdBrew.ROOM_NAME = roomName;
  }
}
