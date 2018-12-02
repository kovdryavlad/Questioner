'use strict';

const Event =  require("../event.js");
const AnswerValidator = require("./AnswerValidator.js");

class QAModel{

	constructor(configFileName) {
		this._configFileName = configFileName;
		this.modelEvent = new Event(this);
		this._numberOfCurrentQuestion = -1;
		this._answerValidator = new AnswerValidator();
		this._answers = {};
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

			this.fireEndConfigFileLoadingEvent();
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
	
	sendAnswer(answer){
		let currentQuestion = this.getCurrentQuestion();

		this._answerValidator.validate(answer, 
									   currentQuestion.validationRules, 
									   this.onSuccessValidation.bind(this), 
									   this.fireChangeErrorText.bind(this));
	}

	saveAnswer(fieldName, fieldValue){

		Object.assign(this._answers, {
			
			[fieldName] : fieldValue

		});

	}

	onSuccessValidation(answer){

		let answerFieldName = this.getCurrentQuestion().answerFieldName;

        if(answerFieldName !== undefined){
			this.saveAnswer(answerFieldName, answer);
		}

		if(this.isIssetNextQuestion()){
			this.nextQuestion();
		}else{
			this.runGame();
		}
	}

	runGame(){

		

	}

	fireChangeErrorText(errorText){
		let ErrorArg = {
			'eventType' : "errorThrowing",
			'error' : errorText
		};

		this.modelEvent.notify(ErrorArg);
	}

	isIssetNextQuestion(){
		if(this._numberOfCurrentQuestion + 1 < this._qalist.length){
			return true;
		} else{
			return false;
		}
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