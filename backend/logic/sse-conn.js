function sseMiddleware (req, res, next) {
    res.sseConnection = new Connection(res);
    console.log(`Res has connection: ${res.sseConnection}`);
    next();
}

class Connection {
    constructor (res) {
        this.res = res;
    }

    setup () {
        console.log("Setting up SSE stream response");
        this.res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connectin': 'keep-alive'
        });
    }

    send (data) {
        console.log(`Send event to stream ${data}`);
        this.res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
}

class Topic {
    constructor () {
        this.conns = [];
    }

    add (conn) {
        conns.push(conn);
        console.log(`New client connected now: ${conns.length}`);
        conn.res.on('close', function () {
            let i = conns.indexOf(conn);
            if (i !== -1) {
                conns.splice(i, 1);
            }
            console.log(`Client disconnected, now: ${conns.length}`);
        });
    }

    sendAll (cb) {
        this.conns.forEach(cb);
    }
}

module.exports = {
    Topic: Topic,
    Connection: Connection,
    SSEMiddleware: sseMiddleware
}
