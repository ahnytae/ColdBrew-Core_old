import { io } from 'socket.io-client';
import { ColdBrew } from 'src/service/Core';

const socket = io();

export class SignalingController extends ColdBrew {
  //
  private constructor(private myPeerConnection: any) {
    super();
    this.myPeerConnection = new RTCPeerConnection();
  }

  joinRoom(roomName: string) {
    socket.emit('join-room', roomName);
    super.RoomName = roomName;
    this.connectSocket(roomName);
  }

  // replace addStream to getTracks()
  makeConnection(remoteVideoEl: HTMLVideoElement) {
    const _myStream = super.MyStream;
    _myStream.getTracks().map((track: MediaStreamTrack) => this.myPeerConnection.addTrack(track, _myStream));
    this.connectIceCandidate(remoteVideoEl);
  }

  // iceCandidate connect
  connectIceCandidate(remoteVideoEl: HTMLVideoElement) {
    this.myPeerConnection.addEventListener('icecandidate', (ice: RTCPeerConnectionIceEvent) => {
      console.log('%c send icecandidate', '%c color: red');
      socket.emit('ice', ice, super.RoomName);
    });
    this.myPeerConnection.addEventListener('track', (streamObj: any) => {
      console.log('addStream', streamObj);
      remoteVideoEl.srcObject = streamObj.stream;
    });
  }

  connectSocket(roomName: string) {
    // role: offer
    socket.on('success-join', async () => {
      console.log('%c [success] join room', 'color: blue');

      // create offer + sdp
      const offer = await this.myPeerConnection.createOffer();
      this.myPeerConnection.setLocalDescription(offer);

      // send offer
      socket.emit('offer', offer, super.RoomName);
    });

    socket.on('answer', async answer => {
      await this.myPeerConnection.setLocalDescription(answer);
    });

    // role: answer
    socket.on('offer', async offer => {
      console.log('%c [receive offer]', offer, 'color: blue');

      this.myPeerConnection.setRemoteDescription(offer);
      const answer = await this.myPeerConnection.createAnswer();
      this.myPeerConnection.setLocalDescription(answer);
      socket.emit('answer', answer, roomName);
    });

    socket.on('ice', ice => {
      console.log('%c [received icecandidate]', ice, 'color: blue');
      this.myPeerConnection.addIceCandidate(ice);
    });
  }
}
