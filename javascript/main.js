require("../css/main.css");
const QAView =  require("./QAapp/QAappView.js");
const QAModel =  require("./QAapp/QAappModel.js");
const QAController =  require("./QAapp/QAappController.js");

document.addEventListener("DOMContentLoaded", function(event) { 
	var qaAppBlock = document.getElementById("QAapp");
	var view  = new QAView(qaAppBlock);
	var model = new QAModel("./javascript/QAapp/QAappConfig.json");
	var controller = new QAController(view, model);    
});
