import { ColdBrew } from '../service/Core';
export class SignalingController extends ColdBrew {
  //
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

  static joinRoom(roomName: string) {
    super.RoomName = roomName;
    ColdBrew.WS.emit('join-room', roomName);
    this.connectSocket(roomName);
  }

  // replace addStream to getTracks()
  static makePeerConnection(remoteVideoEl: HTMLVideoElement) {
    SignalingController.myPeerConnection = new RTCPeerConnection(SignalingController.STUN_URL);

    SignalingController.myPeerConnection.addEventListener('icecandidate', (ice: any) => {
      console.log('%c sent icecandidate', '%c color: red');
      const roomName = super.RoomName;
      ColdBrew.WS.emit('ice', ice, roomName);
    });
    SignalingController.myPeerConnection.addEventListener('track', (peerTrack: RTCTrackEvent) => {
      console.log('got remote peer stream', peerTrack.streams[0]);
      remoteVideoEl.srcObject = peerTrack.streams[0];
    });

    const stream = ColdBrew.MyStream;
    stream.getTracks().map((track: MediaStreamTrack) => SignalingController.myPeerConnection.addTrack(track, stream));
  }

  // iceCandidate connect
  // static connectIceCandidate(remoteVideoEl: HTMLVideoElement) {
  //   SignalingController.myPeerConnection.addEventListener('icecandidate', (ice: any) => {
  //     console.log('%c sent icecandidate', '%c color: red');
  //     const roomName = super.RoomName;
  //     ColdBrew.WS.emit('ice', ice, roomName);
  //   });
  //   SignalingController.myPeerConnection.addEventListener('track', (peerTrack: any) => {
  //     console.log('got remote peer stream', peerTrack);
  //     remoteVideoEl.srcObject = peerTrack.streams[0];
  //   });
  // }

  // static attachRemoteStream(remoteVideoEl?: HTMLVideoElement) {
  //   SignalingController.connectIceCandidate(remoteVideoEl!);
  // }

  static connectSocket(roomName: string) {
    // this.makePeerConnection();

    // role: offer
    ColdBrew.WS.on('success-join', async () => {
      console.log('%c [ColdBrew] success join', 'color: #f3602b');

      // create offer + sdp
      const offer = await SignalingController.myPeerConnection.createOffer();
      SignalingController.myPeerConnection.setLocalDescription(offer);

      // send offer
      const roomName = ColdBrew.RoomName;
      ColdBrew.WS.emit('offer', offer, roomName);
      console.log('%c [ColdBrew] sent offer', 'color: #e64607bc', offer);
    });

    ColdBrew.WS.on('answer', async (answer: any) => {
      console.log('%c [ColdBrew] received answer', 'color: #e64607bc', answer);
      await SignalingController.myPeerConnection.setRemoteDescription(answer);
    });

    // role: answer
    ColdBrew.WS.on('offer', async (offer: any) => {
      console.log('%c [ColdBrew] received offer', offer, 'color: #05c088');

      SignalingController.myPeerConnection.setRemoteDescription(offer);
      const answer = await SignalingController.myPeerConnection.createAnswer();
      SignalingController.myPeerConnection.setLocalDescription(answer);
      ColdBrew.WS.emit('answer', answer, roomName);
      console.log('%c [ColdBrew] sent answer', 'color: #e64607bc', answer);
    });

    ColdBrew.WS.on('ice', (ice: any) => {
      console.log('%c [ColdBrew] received icecandidate', ice, 'color: #d3d61e');
      SignalingController.myPeerConnection.addIceCandidate(ice);
    });
  }
}
