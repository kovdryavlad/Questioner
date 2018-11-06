'use strict';

const Event =  require("../event.js");
const AnswerValidator = require("./AnswerValidator.js");

class QAModel{

	constructor(configFileName) {
		this._configFileName = configFileName;
		this.modelEvent = new Event(this);
		this._numberOfCurrentQuestion = -1;
		this._answerValidator = new AnswerValidator();
	}

	startAsking(){
		this.nextQuestion();
	}

	initializeQAlist(){
		this.fireStartConfigFileLoading();

		fetch(this._configFileName)
		.then(response => response.json())
		.then(response => 
		{
			this._qalist = response["Questions"];

			//имитация загрузки с сервера
			setTimeout((this.fireEndConfigFileLoadingEvent).bind(this), 1000);
		})
		.catch( err => alert('Error with loading config file'))
	}

	fireStartConfigFileLoading(){
		let startLoadingEventArgs = {
			'eventType' : 'StartConfigFileLoading'
		};
		this.modelEvent.notify(startLoadingEventArgs);
	}

	fireEndConfigFileLoadingEvent(){
		let endLoadingEventArgs = {
			'eventType' : 'EndConfigFileLoading'
		};
		this.modelEvent.notify(endLoadingEventArgs);	
	}

	getCurrentQuestion(){
		return this._qalist[this._numberOfCurrentQuestion];
	}

	checkAnswer(answer){
		this.validateAnswer(answer, this.fireChangeErrorText.bind(this, ''));
	}

	sendAnswer(answer){
		this.validateAnswer(answer, this.nextQuestion.bind(this));
	}

	validateAnswer(answer, onSuccess){
		let currentQuestion = this.getCurrentQuestion();

		this._answerValidator.validate(answer, 
									   currentQuestion.validationRules, 
									   onSuccess, 
									   this.fireChangeErrorText.bind(this));
	}

	fireChangeErrorText(errorText){
		let ErrorArg = {
			'eventType' : "errorThrowing",
			'error' : errorText
		};

		this.modelEvent.notify(ErrorArg);
	}

	nextQuestion(){
		this._numberOfCurrentQuestion++;
		let arg = {
			'eventType' : "questionChanging",
			'question': this.getCurrentQuestion().questionText
		};
		
		this.modelEvent.notify(arg);
	}
}

module.exports = QAModel;