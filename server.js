let express = require('express')
let path = require('path')
let SocketIO = require('socket.io')
let qrcode = require('qrcode')

function connect(conn, PORT) {
    let app = global.app = express()

    let _qr = 'invalid'
    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await qrcode.toBuffer(_qr))
    })
    conn.on('qr', qr => {
        _qr = qr
    })
    
    let server = app.listen(PORT, () => console.log('Aplikasi Didengarkan Di Port', PORT))
    let io = SocketIO(server)
    io.on('connection', socket => {
        let { unpipeEmit } = pipeEmit(conn, socket, 'conn-')
        socket.on('disconnect', unpipeEmit)
    })
}

function pipeEmit(event, event2, prefix = '') {
    let old = event.emit
    event.emit = function (event, ...args) {
        old.emit(event, ...args)
        event2.emit(prefix + event, ...args)
    }
    return {
        unpipeEmit() {
            event.emit = old
        }
    }
}


module.exports = connect
