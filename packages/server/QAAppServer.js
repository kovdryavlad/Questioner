const express = require('express')

const config = require('./public/QAappConfig.json');

class QAAppServer{

    createServer(){

        this._app = express();

    }

    setupAPI(){

        this._app.get('/', function (req, res) {
            res.status(200).send('Hello World');
        });

        this._app.get('/questions', function (req, res) {
            res.status(200).type('json').send(config);
        });

        this._app.get('*', function (req, res) {
            res.status(404).type('html').send('<h1>Error!!! Adress is incorrect!</h1>');
        });
    }

    listenPort(port){

        this._app.listen(port);

    }
}

module.exports = QAAppServer;