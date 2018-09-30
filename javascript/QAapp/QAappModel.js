function QAModel(configFileName) {
	this.initializeQAlist(configFileName);	//question-answer 
	this.modelEvent = new Event(this);
	this._currentQuestion = -1;
}

QAModel.prototype = {
	startAsking:function(){
		this.nextQuestion();
	},

    initializeQAlist : function(configFileName){

		var questions = '[ {"question" : "Привіт!", "AnswerValidator" : { "type" : "WithCorrectValues", "error": "Привітайся нормально!", "correctAnswers": ["Привіт", "Добрий день", "Хай"]}},'+
		'{"question" : "Як тебе звати?", "AnswerValidator" : {"type" : "StringType", "error": "Ти ж не робот, напиши нормально!"}},'+				
		'{"question" : "Скільки тобі років?", "AnswerValidator" : {"type" : "NumberType", "minBorder" : 10, "maxBorder" : 100, "minError" : "Йди звідси, щеня", "maxError" : "Що ти тут забув, старий?", "error" : "Ти ж не робот, напиши нормально!"}},'+
		'{"question" : "Ну ми починаємо", "AnswerValidator" : {"type" : "WithoutAnswer", "error": "Не поспішай!"}}' +
		']';

		this._qalist = JSON.parse(questions); 
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