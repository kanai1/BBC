const sendButton = document.getElementById("sendButton")

let webSocket

async function loading() {
	const domain = "52.231.117.51:8888"
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
}

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

function getDataFromSocket(event) {
	const data = JSON.parse(event.data)
	const name = data.name
	const msg = data.message
	addMessage(name, msg)
	console.log(event.data)
}

loading()