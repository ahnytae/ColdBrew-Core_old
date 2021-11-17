## 사이드 프로젝트 1차

ColdBrew-Core는 Typescript로 만들 예정이고, (SDK 형태)
이후 자체 구축한 Core로 React, Next.js 등 자유롭게 만들 수 있습니다.

---

- **ColdBrew-Core Stack**
  - FE: Typescript / BE: Node.js _(추후 Nest.js 검토)_
  - Socket.IO

---

## 1차 기획 (prototype)

- **기간: 2021 10/30 ~ 11/31**
- **1차 prototype 버전에서는 핵심적인 최소한의 기능들만 적용해 빠르게 완료 예정.**
  _ex) 장치 설정/변경, signaling 구축, [socket.io](http://socket.io/), 1:1 방식 구현_
- [1차 진행 작업 현황표 (칸반 notion)](https://as333.notion.site/1-20506d351d5e469fb0e8b9b49fc412ce)

---

## 프로젝트 구조

- Frontend / Backend 폴더 분리.
- Demo: ColdBrew-Core 데모 버전으로 실행 할 수 있게
  express + nodemon으로 _/backend/demo/view/index.html_ 랜더링 셋팅.
  (index.html의 index.js는 /frontend 폴더를 참조).

---

## Demo 실행

1. /backend/demo 이동 후 yarn build 로 bundle.js 생성.
2. /backend 이동
3. `yarn dev` 실행
