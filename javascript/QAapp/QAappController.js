'use strict';

class QAController{

	constructor(view, model) {
		this._view = view;
		this._model = model;
		
		this._view.viewEvent.attach(this.viewEventHandler.bind(this));
		this._model.modelEvent.attach(this.modelEventHandler.bind(this));

		this._model.initializeQAlist();
	}

	modelEventHandler(sender, args) {
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
	}
	
	viewEventHandler(sender, args){
		switch(args.eventType){
			case "sendClicking" : 
				const answer = args.answer;
				this._model.checkAnswer(answer);
				break;
		}
	}
}

module.exports = QAController;