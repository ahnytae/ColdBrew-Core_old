import { io } from 'socket.io-client';
import { ColdBrew } from 'src/service/Core';

const socket = io();

export class SignalingController extends ColdBrew {
  //
  private myPeerConnection = new RTCPeerConnection();

  joinRoom(roomName: string) {
    socket.emit('join-room', roomName);

    let _roomName = super.RoomName;
    _roomName = roomName;

    // role: offer
    socket.on('success-join', async () => {
      console.log('%c [success] join room', 'color: blue');

      // create offer + sdp
      const offer = await this.myPeerConnection.createOffer();
      this.myPeerConnection.setLocalDescription(offer);

      // send offer
      socket.emit('offer', offer, _roomName);

      // receive offer
      socket.on('offer', offer => {
        console.log('%c [receive offer]', offer, 'color: blue');
      });
    });
  }

  makeConnection() {
    const _myStream = super.MyStream;
    _myStream.getTracks().map((track: MediaStreamTrack) => this.myPeerConnection.addTrack(track, _myStream));
  }
}
