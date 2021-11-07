export class ColdBrew {
  constructor() {
    console.log('%c HELLO ColeBrew !!', 'color: hotpink; font-size:40px; background:black');
  }

  protected static MyStream: MediaStream;
  protected static RoomName: string;

  get myStream(): MediaStream {
    return ColdBrew.MyStream;
  }
}
