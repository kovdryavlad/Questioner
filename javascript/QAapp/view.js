function QAView(appBlock) {
    this._appBlock = appBlock;
	this.createMarkupOfApp()
	this.sendClickEvent = new Event(this);
}

QAView.prototype = {
	createMarkupOfApp : function(){
		var form = document.createElement("FORM"); 
		form.setAttribute("class", "flexContainer")
		this._appBlock.appendChild(form);
		
		this._question = document.createElement("P"); 
		form.appendChild(this._question);
		
		this._answerInput = document.createElement("INPUT"); 
		this._answerInput.setAttribute("type", "text");
		form.appendChild(this._answerInput);
		
		var button = document.createElement("INPUT"); 
		button.setAttribute("type", "button");
		button.setAttribute("value", "Відправити");
		button.onclick = this.onSendClick.bind(this);
		form.appendChild(button);
		
		this._error = document.createElement("P"); 
		this._error.setAttribute("class", "error")
		form.appendChild(this._error);
	},
	
	onSendClick : function(){
		var answer = this._answerInput.value;
		this.sendClickEvent.notify({
			'answer': answer
		});
	}, 
	
	setQuestion : function(textOfQuestion){
		this._question.textContent = textOfQuestion;
	},
	
	showError : function(textOfError){
		this._error.textContent = textOfError;
	},
	
	clearError : function(){
		this.showError("");
	},
	
	clearAnswerInput : function(){
		this._answerInput.value = "";
	}
};