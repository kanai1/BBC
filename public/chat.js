/*const loadingButton = document.getElementById("LoadingButton")
const sendButton = document.getElementById("sendButton")

let webSocket
let oldestMessageId = 'newest'

loadingButton.addEventListener('click', async() => {
	const domain = document.getElementById("BackendDomainInput").value
	const msgList = await getMsgList(domain, oldestMessageId)
	msgList.reverse()
	msgList.map( (e) => {
		addOldMessage(e.name, e.msg)
	})
	if(loadingButton.textContent == '로딩') {
		setWebSocket(domain)
		document.getElementById("BackendDomainInput").setAttribute('readonly', 'true')
		loadingButton.textContent = '오래된 메시지 가져오기'
	}
})

sendButton.addEventListener('click', async() => {
	const name = getValue('name', false)
	const msg = getValue('message')

	const data = {
		'type': 'msg_send',
		'name': name,
		'message': msg
	}
	webSocket.send(JSON.stringify(data))
})

function setWebSocket(domain) {
	webSocket = new WebSocket(`ws://${domain}`)
	webSocket.onmessage = getDataFromSocket
}

async function getMsgList(domain, option) {
	try {
		const response = await fetch(`http://${domain}/list?option=${option}`)
		const data = await response.json()
		if(data.code !== 200) throw 'code is not 200'
		oldestMessageId = data.oldestMessageId
		return data.list
	} catch (e) {
		alert("로딩에 실패했습니다. 도메인이나 서버를 다시 확인해주세요.")
	}
}

function getValue(attribute, init = true) {
	const attr = document.getElementById(attribute)
	const value = attr.value
	attr.value = init?"":attr.value
	return value
}

function addMessage(name, msg) {
	const messageBox = document.getElementById("messageBox")
	const spanChild = document.createElement('span')
	const brChild = document.createElement('br')

	spanChild.textContent = `${name}: ${msg}`
	messageBox.append(spanChild, brChild)
	messageBox.scrollTop = messageBox.scrollHeight;
}

function addOldMessage(name, msg) {
	const messageBox = document.getElementById("messageBox")
	const spanChild = document.createElement('span')
	const brChild = document.createElement('br')

	spanChild.textContent = `${name}: ${msg}`
	messageBox.prepend(spanChild, brChild)
	messageBox.scrollTop = 0;
}

function getDataFromSocket(event) {
	const data = JSON.parse(event.data)
	const name = data.name
	const msg = data.message
	addMessage(name, msg)
	console.log(event.data)
}*/
const loadingButton = document.getElementById("LoadingButton")
const sendButton = document.getElementById("sendButton")

let localConnection;
let dataChannel;

// Offer를 생성하고 상대방에게 전송하는 함수
async function createOffer() {
    const configuration = { iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        { 
            urls: 'turn:your-turn-server-address:3478', 
            username: 'testUser', 
            credential: 'testPass' 
        }
    
    ] }; // ICE 서버는 여기에 추가 가능

    localConnection = new RTCPeerConnection(configuration);

    // 데이터 채널 생성
    dataChannel = localConnection.createDataChannel('textChannel');

    // 데이터 채널 열릴 때 이벤트 핸들러
    dataChannel.addEventListener('open', () => {
        console.log('데이터 채널이 열렸습니다.');
    });

    // 상대방으로부터 데이터를 받았을 때 이벤트 핸들러
    dataChannel.addEventListener('message', (event) => {
        const receivedMessage = event.data;
        displayMessage(receivedMessage);
    });

    // Offer 생성
    const offer = await localConnection.createOffer();
    await localConnection.setLocalDescription(offer);

    // Offer를 상대방에게 전송
    sendMessage({ offer });
}

// Answer를 생성하고 Offer를 수락하는 함수
async function createAnswer(offer) {
    const configuration = { iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        { 
            urls: 'turn:http://52.231.117.51:8888', 
            username: 'testUser', 
            credential: 'testPass' 
        }
    ] }; // ICE 서버는 여기에 추가 가능
    
    localConnection = new RTCPeerConnection(configuration);

    // 데이터 채널 생성
    localConnection.addEventListener('datachannel', (event) => {
        dataChannel = event.channel;

        // 데이터 채널 열릴 때 이벤트 핸들러
        dataChannel.addEventListener('open', () => {
            console.log('데이터 채널이 열렸습니다.');
        });

        // 상대방으로부터 데이터를 받았을 때 이벤트 핸들러
        dataChannel.addEventListener('message', (event) => {
            const receivedMessage = event.data;
            displayMessage(receivedMessage);
        });
    });

    // Offer를 수락하고 Answer 생성
    await localConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await localConnection.createAnswer();
    await localConnection.setLocalDescription(answer);

    // Answer를 상대방에게 전송
    sendMessage({ answer });
}

// ICE candidate를 처리하는 함수
function handleIceCandidate(event) {
    if (event.candidate) {
        sendMessage({ iceCandidate: event.candidate });
    }
}

function sendMessage() {
	if (dataChannel) {
        dataChannel.send(JSON.stringify(data));
    }
}

// 메시지를 상대방에게 전송하는 함수
function sendTextMessage() {
    // 상대방에게 메시지 전송 로직을 추가하세요
    // WebSocket이나 다른 통신 수단을 사용할 수 있습니다.

    // 예시: 데이터 채널을 통해 메시지 전송

	const name = getValue('name', false)
	const msg = getValue('message')

	const data = {
		'type': 'msg_send',
		'name': name,
		'message': msg
	}

    if (dataChannel) {
        dataChannel.send(JSON.stringify(data));
    }
}

// Offer를 수락하는 함수
function acceptOffer(offer) {
    createAnswer(offer);
}

// 상대방의 ICE candidate를 처리하는 함수
function handleRemoteIceCandidate(candidate) {
    localConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

// 채팅 로그에 메시지 추가
function displayMessage(message) {
    const messageBox = document.getElementById("messageBox")
	const spanChild = document.createElement('span')
	const brChild = document.createElement('br')

	spanChild.textContent = `${message.name}: ${message.message}`
	messageBox.append(spanChild, brChild)
	messageBox.scrollTop = messageBox.scrollHeight;
}

function getValue(attribute, init = true) {
	const attr = document.getElementById(attribute)
	const value = attr.value
	attr.value = init?"":attr.value
	return value
}

// Offer 생성
createOffer();

loadingButton.addEventListener('click', sendTextMessage)