'use strict';

require("../css/main.css");
const QAView =  require("./QAapp/QAappView.js");
const QAModel =  require("./QAapp/QAappModel.js");
const QAController =  require("./QAapp/QAappController.js");

document.addEventListener("DOMContentLoaded", function(event) { 
	const ID_OF_BLOCK_WITH_APP = "QAapp";
	const PATH_TO_CONFIG_FILE = "./QAappConfig.json";	//для папки dist

	const qaAppBlock = document.getElementById(ID_OF_BLOCK_WITH_APP);
	const view  = new QAView(qaAppBlock);
	const model = new QAModel(PATH_TO_CONFIG_FILE);		
	const controller = new QAController(view, model);    
});
