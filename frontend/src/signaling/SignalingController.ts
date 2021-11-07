import { io } from 'socket.io-client';

const socket = io();

export class SignalingController {
  private static ROOM_NAME: string;

  constructor() {
    console.log('[load] signaling...');
  }

  static joinRoom(roomName: string) {
    SignalingController.ROOM_NAME = roomName;
    socket.emit('join-room', roomName);
    socket.on('success-join', () => {
      console.log('%c [success] join room', 'color: blue');
    });
  }
}
