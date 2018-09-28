function QAModel() {
	this.initializeQAlist();	//question-answer 
	this.questionChanging = new Event(this);
	this._currentQuestion = -1;
}

QAModel.getQAObject = function(question, error, validationFunction){
	var qaObject = {
		'question': question,
		'validCheck' : validationFunction,
		'error' : error		
	};
	
	return qaObject;
}

QAModel.prototype = {
    initializeQAlist : function(){
		this._qalist = [];
		
		//first question-answer object
		var qa0 = QAModel.getQAObject("Привіт!", "Привітайся нормально", function(answer){
			var arr = ["Привіт", "Добрий день", "Хай"];
			return arr.includes(answer);
		});
		this._qalist.push(qa0);
		
		//second question-answer object
		var qa1 = QAModel.getQAObject("Як тебе звати?", "Ти ж не робот, напиши нормально", function(answer){
			if(answer.length == 0)
				return false;
			
			var filteredAnswer = answer.match(/[a-zа-я]/gi);
			if(filteredAnswer===null)
				return false;
			
			if(filteredAnswer.length == answer.length){
				return true;
			}else{
				return false;
			}
			
		});
		this._qalist.push(qa1);
		
		//third-question answer object
		var qa2 = QAModel.getQAObject("Скільки тобі років?", "Ти ж не робот, напиши нормально", function(answer){
			try{
				if(+answer<0){
					return false;
				}
				if(+answer<10){
					this.error = "Йди звідси, щеня";
				}
				else if(+answer>100){
					this.error = "Що ти тут забув, старий?"					
				}
				else{
					return true;
				}
			}
			catch(err){
				return false;
			}
		});
		this._qalist.push(qa2);
		
		//fourth question-answer object
		var qa3 = QAModel.getQAObject("Ну ми починаємо", "Не поспішай!", function(answer){
			return false;
		});
		this._qalist.push(qa3);
	},
	
	nextQuestion : function(){
		this._currentQuestion++;
		var arg = {
			qaObject: this._qalist[this._currentQuestion]
		};
		
		this.questionChanging.notify(arg);
	}
};