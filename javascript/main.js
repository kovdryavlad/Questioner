document.addEventListener("DOMContentLoaded", function(event) { 
	var qaApp = document.getElementById("QAapp");
	var view  = new QAView(qaApp);
	var model = new QAModel("./javascript/QAapp/QAappConfig.json");
	var controller = new QAController(view, model);    
});
