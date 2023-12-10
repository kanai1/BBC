const Turn = require('node-turn');
const crypto = require('crypto');

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
function createTurnServer() {
  const turnServer = new Turn({
    listeningPort: 8888,
    authMech: 'long-term',
    credentials: generateUserCredentials(),
    listeningIps: ['0.0.0.0'],
    verbose: true,
  });

  return turnServer;
}

module.exports = { createTurnServer };