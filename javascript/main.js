'use strict';

require("../css/main.css");
const QAApp =  require("./QAapp/ViewReact/QAapp.jsx");
const QAModel =  require("./QAapp/QAappModel.js");
const QAController =  require("./QAapp/QAappController.js");

const React = require('react');
const ReactDOM = require('react-dom');

const ID_OF_BLOCK_WITH_APP = "appContainer";
const PATH_TO_CONFIG_FILE = "./QAappConfig.json";	//для папки dist

document.addEventListener("DOMContentLoaded", function(event) { 
	const view  = new QAApp();
	
	ReactDOM.render(
		view.render(),
		document.getElementById(ID_OF_BLOCK_WITH_APP)
	);

	const model = new QAModel(PATH_TO_CONFIG_FILE);		
	const controller = new QAController(view, model);  
	
	
});
