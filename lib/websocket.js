const websocket = require('ws')

let sockets = []
module.exports = (server) => {
        const wss = new websocket.Server({server})

        wss.on('connection', (ws, req) => {
                console.log(req.connection.remoteAddress)

                ws.id = req.headers['sec-websocket-key']
                sockets.push(ws)

                console.log(sockets.length)

                ws.on('close', (code, reason) => {
                        console.log('socket closed')
                        sockets = sockets.filter(v => {
                                console.log(ws.id === v.id)
                                return ws.id !== v.id
                        })

                        console.log(sockets.length)
                })

                ws.on('message', (response) => {
                        let {type, name, message} = JSON.parse(response.toString())
                        console.log(type, name, message);

                        switch(type) {
                                case 'msg_send': sockets.forEach(v => v.send(JSON.stringify({'name': name, 'message':message})))
                                break;
                        }
                })
        })
}