'use strict';

require("../css/main.css");
const QAView =  require("./QAapp/QAappView.js");
const QAModel =  require("./QAapp/QAappModel.js");
const QAController =  require("./QAapp/QAappController.js");

const ID_OF_BLOCK_WITH_APP = "QAapp";
const PATH_TO_CONFIG_FILE = "./QAappConfig.json";	//для папки dist

document.addEventListener("DOMContentLoaded", function(event) { 
	let qaAppBlock = document.getElementById(ID_OF_BLOCK_WITH_APP);
	let view  = new QAView(qaAppBlock);
	let model = new QAModel(PATH_TO_CONFIG_FILE);		
	let controller = new QAController(view, model);    
});
