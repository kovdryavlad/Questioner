const QAAppServer = require('./QAAppServer.js');
const PORT = 3000;

const server = new QAAppServer();

server.createServer();
server.initializeStaticResources();
server.setupAPI();
server.listenPort(PORT);