function QAView(appBlock) {
    this._appBlock = appBlock;
	this.createMarkupOfApp()
	this.viewEvent = new Event(this);
}

QAView.prototype = {
	createMarkupOfApp : function(){
		this._form = document.createElement("FORM"); 
		this._form.setAttribute("class", "flexContainer")
		this._appBlock.appendChild(this._form);
		
		this._question = document.createElement("P"); 
		this._form.appendChild(this._question);
		
		this._answerInput = document.createElement("INPUT"); 
		this._answerInput.setAttribute("type", "text");
		this._form.appendChild(this._answerInput);
		
		var button = document.createElement("INPUT"); 
		button.setAttribute("type", "button");
		button.setAttribute("value", "Відправити");
		button.onclick = this.onSendClick.bind(this);
		this._form.appendChild(button);
		
		this._error = document.createElement("P"); 
		this._error.setAttribute("class", "error")
		this._form.appendChild(this._error);

		//подписка на нажатие клавиши
		document.onkeydown = this.enterPressDetecting.bind(this);

		//загрузчик(гифка)
		this._loader = document.createElement("IMG");
		this._loader.setAttribute("src", "./assets/loader.gif");
		this._loader.classList.add("inVisible");
		this._loader.classList.add("loader");
		this._appBlock.appendChild(this._loader);
	},
	
	enterPressDetecting: function(e){
		if(e.keyCode == 13){	//13 - Enter's code
			this.onSendClick();
			return false;			//без этого false обновляется страница
		}
	},

	onSendClick : function(){
		var answer = this._answerInput.value;
		this.viewEvent.notify({
			'eventType': "sendClicking",
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
	},

	showLoader : function(){
		this._form.classList.add("inVisible");
		this._loader.classList.remove("inVisible");
	},

	hideLoader : function(){
		this._loader.classList.add("inVisible");
		this._form.classList.remove("inVisible");
	}
};