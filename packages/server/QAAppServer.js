var express = require('express')

class QAAppServer{

    createServer(){

        this._app = express();

    }

    setupAPI(){

        this._app.get('/', function (req, res) {
            res.status(200).send('Hello World');
        })

    }

    listenPort(port){

        this._app.listen(port);

    }
}

module.exports = QAAppServer;