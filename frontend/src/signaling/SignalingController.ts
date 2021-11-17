import { io, Socket } from 'socket.io-client';
import { ColdBrew } from '../service/Core';

export class SignalingController extends ColdBrew {
  //
  private static WS: Socket;
  private static myPeerConnection: RTCPeerConnection;
  private static readonly STUN_URL = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };

  private constructor() {
    super();
    SignalingController.WS = io();
    console.log('%c HELLO ColeBrew', 'color: hotpink; font-size:40px; background:black');
    console.log('%c [ColdBrew] connected socket', 'color: skyblue', SignalingController.WS);
  }

  static async init(): Promise<SignalingController> {
    return new SignalingController();
  }

  static async joinRoom(roomName: string) {
    super.RoomName = roomName;
    await this.init();
    SignalingController.WS.emit('join-room', roomName);
    this.connectSocket(roomName);
  }

  // replace addStream to getTracks()
  static makePeerConnection(remoteVideoEl: HTMLVideoElement) {
    SignalingController.myPeerConnection = new RTCPeerConnection(SignalingController.STUN_URL);

    SignalingController.myPeerConnection.addEventListener('icecandidate', (ice: any) => {
      console.log('%c sent icecandidate', '%color: red', ice);
      const roomName = super.RoomName;
      SignalingController.WS.emit('ice', ice, roomName);
    });
    SignalingController.myPeerConnection.addEventListener('track', (peerTrack: any) => {
      console.log('got remote peer stream', peerTrack.streams[0]);
      remoteVideoEl.srcObject = peerTrack.streams[0];
    });

    const stream = ColdBrew.MyStream;
    console.log('###', stream);
    stream.getTracks().map((track: MediaStreamTrack) => SignalingController.myPeerConnection.addTrack(track, stream));
  }

  static connectSocket(roomName: string) {
    // this.makePeerConnection(remoteVideoEl);

    /** socket area **/
    // role: offer
    SignalingController.WS.on('success-join', async () => {
      console.log('%c [ColdBrew] success join', 'color: #f3602b');

      // create offer + sdp
      const offer = await SignalingController.myPeerConnection.createOffer();
      SignalingController.myPeerConnection.setLocalDescription(offer);

      // send offer
      const roomName = ColdBrew.RoomName;
      SignalingController.WS.emit('offer', offer, roomName);
      console.log('%c [ColdBrew] sent offer', 'color: #e64607bc', offer);

      SignalingController.WS.on('answer', async (answer: any) => {
        console.log('%c [ColdBrew] received answer', 'color: #e64607bc', answer);
        await SignalingController.myPeerConnection.setRemoteDescription(answer);
      });
    });

    // role: answer
    SignalingController.WS.on('offer', async (offer: any) => {
      console.log('%c [ColdBrew] received offer', offer, 'color: #05c088');

      await SignalingController.myPeerConnection.setRemoteDescription(offer);
      const answer = await SignalingController.myPeerConnection.createAnswer();
      SignalingController.myPeerConnection.setLocalDescription(answer);
      SignalingController.WS.emit('answer', answer, roomName);
      console.log('%c [ColdBrew] sent answer', 'color: #e64607bc', answer);
    });

    SignalingController.WS.on('icecandidate', (ice: any) => {
      console.log('%c [ColdBrew] received icecandidate', 'color: #d3d61e', ice);
      SignalingController.myPeerConnection.addIceCandidate(ice);
    });
  }
}
