const Turn = require('node-turn');
const crypto = require('crypto');
const socketIo = require('socket.io');
const http = require('http')

// 무작위 사용자 이름과 비밀번호 생성 함수
function generateUserCredentials() {
  /*
  const username = crypto.randomBytes(16).toString('hex');
  const password = crypto.randomBytes(32).toString('hex');
  */
  const username = "testUser"
  const password = "testPass"
  return { username, password };
}

// TURN 서버 설정 및 인스턴스 생성
const turnServer = new Turn({
  listeningPort: 3478,
  authMech: 'long-term',
  credentials: generateUserCredentials(),
  listeningIps: ['0.0.0.0'],
  verbose: true,
});

const httpServer = http.createServer();
const io = socketIo(httpServer);

io.on('connection', (socket) => {
  // 클라이언트가 연결 요청 시
  socket.on('offer', (offer, targetUserId) => {
    // targetUserId에게 offer를 전송
    io.to(targetUserId).emit('offer', offer, socket.id);
  });

  // 클라이언트가 answer를 전송 시
  socket.on('answer', (answer, targetUserId) => {
    // targetUserId에게 answer를 전송
    io.to(targetUserId).emit('answer', answer);
  });

  // ICE candidate를 전송 시
  socket.on('ice-candidate', (candidate, targetUserId) => {
    // targetUserId에게 ICE candidate를 전송
    io.to(targetUserId).emit('ice-candidate', candidate);
  });
});

httpServer.listen(3478, () => {
  console.log('TURN server is running on port 3000');
});

function startTurnServer() {
  turnServer.start(httpServer);
}

module.export = {startTurnServer}