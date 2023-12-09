const loadingButton = document.getElementById("LoadingButton")
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
}