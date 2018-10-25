'use strict';

const Event =  require("../event.js");

class QAModel{

	constructor(configFileName) {
		this._configFileName = configFileName;
		this.modelEvent = new Event(this);
		this._currentQuestion = -1;
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
		const startLoadingEventArgs = {
			'eventType' : 'StartConfigFileLoading'
		};
		this.modelEvent.notify(startLoadingEventArgs);
	}

	fireEndConfigFileLoadingEvent(){
		const endLoadingEventArgs = {
			'eventType' : 'EndConfigFileLoading'
		};
		this.modelEvent.notify(endLoadingEventArgs);	
	}

	checkAnswer(answer){
		const answerValidator = this._qalist[this._currentQuestion].AnswerValidator;
		
		if(answerValidator.type == "WithCorrectValues"){
			if(answerValidator.correctAnswers.includes(answer)){
				this.nextQuestion();
				return;
			} else{
				this.runErrorThowing(answerValidator.error);
				return;
			}
		} 
		
		else if(answerValidator.type == "StringType"){
			if(answer === ""){
				this.runErrorThowing(answerValidator.error);
				return;
			}
			var filteredAnswer = answer.match(/[a-zа-я]/gi);
			
			if(filteredAnswer == null){
				this.runErrorThowing(answerValidator.error);
				return;
			}
			
			else if(filteredAnswer.length == answer.length){
				this.nextQuestion();
				return;
			}
			else{
				this.runErrorThowing(answerValidator.error);
				return;
			}
		}

		else if(answerValidator.type == "NumberType"){
			const filteredAnswer = answer.match(/[0-9]/gi);
			
			if(filteredAnswer == null || filteredAnswer.length !== answer.length){
				this.runErrorThowing(answerValidator.error);
				return;
			}
			else if(+answer<answerValidator.minBorder){
				this.runErrorThowing(answerValidator.minError);
				return;
			}
			else if(+answer>answerValidator.maxBorder){
				this.runErrorThowing(answerValidator.maxError);
				return;
			}
			else{
				this.nextQuestion();
				return;
			}
		
		}

		else if(answerValidator.type == "WithoutAnswer"){
			this.runErrorThowing(answerValidator.error);
			return;
		}
	}

	runErrorThowing(errorText){
		const ErrorArg = {
			'eventType' : "errorThrowing",
			'error' : errorText
		};

		this.modelEvent.notify(ErrorArg);
	}

	nextQuestion(){
		this._currentQuestion++;
		var arg = {
			'eventType' : "questionChanging",
			'question': this._qalist[this._currentQuestion].question
		};
		
		this.modelEvent.notify(arg);
	}
}

module.exports = QAModel;