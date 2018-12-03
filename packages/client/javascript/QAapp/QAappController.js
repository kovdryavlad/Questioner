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
				this._model.startAsking();
				break;
				
			case "questionChanging":
				this._view.clearAnswerInput();
				this._view.clearError();
				this._view.setQuestion(args.question);
				break;

			case "errorThrowing": 
				this._view.showError(args.error);
				break;
		}
	}
	
	viewEventHandler(sender, args){
		switch(args.eventType){
			case "answerSending" : 
				this._model.sendAnswer(args.answer);
				break;
			case "keyPressing" :
				this.handleKeyPressing(args.keyCode);
				break;
				
		}
	}

	handleKeyPressing(keyCode){
		if(keyCode == 13) { //код клавиши Enter
			this._view.processAnswer();
		}
	}
}

module.exports = QAController;