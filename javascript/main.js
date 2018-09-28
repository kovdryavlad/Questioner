document.addEventListener("DOMContentLoaded", function(event) { 
	var qaApp = document.getElementById("QAapp");
	var view  = new QAView(qaApp);
	var model = new QAModel();
	var controller = new QAController(view, model);    
});
