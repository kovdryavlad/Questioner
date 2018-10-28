'use strict';

const Event =  require("../event.js");

class QAView{
	
	constructor(appBlock) {
		this._nameOfInvisibleClass = "inVisible";
		this._appBlock = appBlock;
		this.createMarkupOfApp()
		this.viewEvent = new Event(this);
	}

	createMarkupOfApp(){
		this._form = document.createElement("FORM"); 
		this._form.setAttribute("class", "flexContainer")
		this._appBlock.appendChild(this._form);
		
		this._question = document.createElement("P"); 
		this._form.appendChild(this._question);
		
		this._answerInput = document.createElement("INPUT"); 
		this._answerInput.setAttribute("type", "text");
		this._form.appendChild(this._answerInput);
		
		let button = document.createElement("INPUT"); 
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
		this._loader.setAttribute("src", "./loader.gif"); //для папки dist
		this._loader.classList.add("inVisible");
		this._loader.classList.add("loader");
		this._appBlock.appendChild(this._loader);
	}

	enterPressDetecting(e){
		if(e.keyCode == 13){		//13 - Enter's code
			this.onSendClick();
			return false;			//без этого false обновляется страница
		}
	}

	onSendClick(){
		let answer = this._answerInput.value;
		this.viewEvent.notify({
			'eventType': "sendClicking",
			'answer': answer
		});
	}

	setQuestion(textOfQuestion){
		this._question.textContent = textOfQuestion;
	}

	showError(textOfError){
		this._error.textContent = textOfError;
	}

	clearError(){
		this.showError("");
	}

	clearAnswerInput(){
		this._answerInput.value = "";
	}

	showLoader(){
		this._form.classList.add(this._nameOfInvisibleClass);
		this._loader.classList.remove(this._nameOfInvisibleClass);
	}

	hideLoader(){
		this._loader.classList.add(this._nameOfInvisibleClass);
		this._form.classList.remove(this._nameOfInvisibleClass);
	}
}

module.exports = QAView;