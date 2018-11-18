const QAAppServer = require('./QAAppServer.js');
const PORT = 3000;

const server = new QAAppServer();

server.createServer();
server.setupAPI();
server.listenPort(PORT);