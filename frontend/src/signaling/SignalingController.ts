import { io } from 'socket.io-client';

const socket = io();

export const SignalingController = () => {
  console.log('signaling...', socket);
};
