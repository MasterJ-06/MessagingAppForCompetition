const http = require('http')
const staticHandler = require('serve-handler')
const ws = require('ws')

//serve static folder
const server = http.createServer((req, res) => {   // (1)
    return staticHandler(req, res, { public: 'public' })
});

const wss = new ws.WebSocketServer({ server }) // (2)
wss.on('connection', (client) => {
    console.log('Client connected !')
    client.on('message', (msg) => {    // (3)
        console.log(`Message:${msg}`);
        broadcast(msg)
    })
})

function broadcast(msg) {       // (4)
    for (const client of wss.clients) {
        if (client.readyState === ws.OPEN) {
            client.send(msg)
        }
    }
}

server.listen(process.argv[2] || 3000, () => {
    console.log(`server listening...`);
})
