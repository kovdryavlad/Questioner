const Event =  require("../event.js");

function QAModel(configFileName) {
	this._configFileName = configFileName;
	this.modelEvent = new Event(this);
	this._currentQuestion = -1;
}

QAModel.prototype = {
	startAsking:function(){
		this.nextQuestion();
	},

    initializeQAlist : function(){
		var fileName = this._configFileName;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', fileName, true);

		var startLoadingEventArgs = {
			'eventType' : 'StartConfigFileLoading'
		};
		this.modelEvent.notify(startLoadingEventArgs);

		xhr.onreadystatechange = (function() { 
			if (xhr.readyState != 4) return;

			if (xhr.status != 200) {
				alert("Error with loading config file '" + fileName + 
					  "'\n" + xhr.status + ': ' + xhr.statusText);
			} else {
				var response = JSON.parse(xhr.responseText);
				this._qalist = response["Questions"];

				setTimeout((this.throwEndConfigFileLoadingEvent).bind(this), 1000);
			}

		}).bind(this);

		xhr.send(); 
	},

	throwEndConfigFileLoadingEvent(){
		var endLoadingEventArgs = {
			'eventType' : 'EndConfigFileLoading'
		};
		this.modelEvent.notify(endLoadingEventArgs);	
	},

	checkAnswer : function(answer){
		var answerValidator = this._qalist[this._currentQuestion].AnswerValidator;
		
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
			if(answer===""){
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
			var filteredAnswer = answer.match(/[0-9]/gi);
			
			if(filteredAnswer == null ||filteredAnswer.length !== answer.length){
				this.runErrorThowing(answerValidator.error);
				return;
			}
			else if(+answer<10){
				this.runErrorThowing(answerValidator.minError);
				return;
			}
			else if(+answer>100){
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
	},

	runErrorThowing : function(errorText){
		var ErrorArg = {
			'eventType' : "errorThrowing",
			'error' : errorText
		};

		this.modelEvent.notify(ErrorArg);
	},

	nextQuestion : function(){
		this._currentQuestion++;
		var arg = {
			'eventType' : "questionChanging",
			'question': this._qalist[this._currentQuestion].question
		};
		
		this.modelEvent.notify(arg);
	}
};