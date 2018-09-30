function QAController(view, model) {
    this._view = view;
	this._model = model;
	
	var onViewEvent = this.viewEventHandler.bind(this);
	this._view.viewEvent.attach(onViewEvent);
	
	var onModelEvent = this.modelEventHandler.bind(this);
	this._model.modelEvent.attach(onModelEvent);

	this._model.startAsking();
}

QAController.prototype = {
    modelEventHandler : function (sender, args) {
		if(args.eventType == "questionChanging"){
			this._view.clearError();
			this._view.clearAnswerInput();
			this._view.setQuestion(args.question);
		}

		else if(args.eventType == "errorThrowing"){
			this._view.showError(args.error);
		}
    },
	
	viewEventHandler : function(sender, args){
		if(args.eventType == "sendClicking"){
			var answer = args.answer;
			this._model.checkAnswer(answer);
		}
	}
};