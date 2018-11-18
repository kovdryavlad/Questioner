var express = require('express')

class QAAppServer{

    createServer(){

        this._app = express();

    }


    initializeStaticResources(){

        //static/QAappConfig.json
        //will return config file
        this._app.use('/static', express.static(__dirname + '/public'));
    }

    setupAPI(){

        this._app.get('/', function (req, res) {
            res.status(200).send('Hello World');
        })

        this._app.get('*', function (req, res) {
            res.status(404).type('html').send('<h1>Error!!! Adress is incorrect!</h1>');
        })
    }

    listenPort(port){

        this._app.listen(port);

    }
}

module.exports = QAAppServer;