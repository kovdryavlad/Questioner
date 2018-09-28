function QAController(view, model) {
    this._view = view;
	this._model = model;
	
	var sendClick = this.onSendClick.bind(this);
	this._view.sendClickEvent.attach(sendClick);
	
	var questionChange = this.onQuestionChange.bind(this);
	this._model.questionChanging.attach(questionChange);
	
	this._model.nextQuestion();
}

QAController.prototype = {
    onQuestionChange : function (sender, args) {
        this._qaObject = args.qaObject;
		this._view.setQuestion(this._qaObject.question);
    },
	
	onSendClick : function(sender, args){
		var answer = args.answer;
		if(this._qaObject.validCheck(answer)){
			this._view.clearAnswerInput();
			this._view.clearError();
			this._model.nextQuestion();
		}else{
			this._view.showError(this._qaObject.error);
		}
	}
};