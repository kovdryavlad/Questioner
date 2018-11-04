'use strict';

require("../css/main.css");
const QAApp =  require("./QAapp/ViewReact/QAapp.jsx");
const QAModel =  require("./QAapp/QAappModel.js");
const QAController =  require("./QAapp/QAappController.js");

const ID_OF_BLOCK_WITH_APP = "appContainer";
const PATH_TO_CONFIG_FILE = "./QAappConfig.json";	//для папки dist

document.addEventListener("DOMContentLoaded", function(event) { 
	let qaAppBlock = document.getElementById(ID_OF_BLOCK_WITH_APP);
	//let view  = new QAApp(qaAppBlock);
	let model = new QAModel(PATH_TO_CONFIG_FILE);		
	let controller = new QAController(view, model);    
});
