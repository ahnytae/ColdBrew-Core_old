import { io, Socket } from 'socket.io-client';

export class ColdBrew {
  protected static WS: Socket;

  protected constructor() {
    ColdBrew.WS = io();
    console.log('%c HELLO ColeBrew', 'color: hotpink; font-size:40px; background:black');
    console.log('%c [ColdBrew] connected socket', 'color: skyblue', ColdBrew.WS);
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

  static get RoomName(): string {
    return ColdBrew.ROOM_NAME;
  }
  static set RoomName(roomName: string) {
    ColdBrew.ROOM_NAME = roomName;
  }
}
