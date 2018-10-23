function QAController(view, model) {
    this._view = view;
	this._model = model;
	
	var onViewEvent = this.viewEventHandler.bind(this);
	this._view.viewEvent.attach(onViewEvent);
	
	var onModelEvent = this.modelEventHandler.bind(this);
	this._model.modelEvent.attach(onModelEvent);

	this._model.initializeQAlist();
}

QAController.prototype = {
    modelEventHandler : function (sender, args) {
		switch(args.eventType){
			case "StartConfigFileLoading" :
				this._view.showLoader();
				break;
			
			case "EndConfigFileLoading":
				this._view.hideLoader();
				this._model.startAsking();
				break;
				
			case "questionChanging":
				this._view.clearError();
				this._view.clearAnswerInput();
				this._view.setQuestion(args.question);
				break;

			case "errorThrowing": 
				this._view.showError(args.error);
				break;
		}
    },
	
	viewEventHandler : function(sender, args){
		if(args.eventType == "sendClicking"){
			var answer = args.answer;
			this._model.checkAnswer(answer);
		}
	}
};

module.exports = QAController;