'use strict';


const Quetioner = require('./Questioner.jsx');
const Loader = require('./Loader.jsx');
const Game = require('./Game.jsx');
const Event =  require("../../event.js");
const React = require('react');

class QAApp extends React.Component{
	
	constructor(props) {
		super(props);
	
		this.state = {
			question      : "questionText",
			error         : "errorText",
			answer        : "",
			action        : "loader", //loader, questioner, game
			gameUrl		  : "http://localhost:5050/",
			answers 	  : undefined
		};

		this.handleAnswerChange = this.handleAnswerChange.bind(this);
		this.handleSendAnswerClick = this.handleSendAnswerClick.bind(this);
		//Other
		this.viewEvent = new Event(this);
		
		//подписка на нажатие клавиши
		document.onkeydown = this.enterPressDetecting.bind(this);
	}

	componentDidMount() {
		this.props.onStart(this);
	}

	render(){

		let content;

		switch(this.state.action){

			case "loader":
				content = <Loader pathToImage="./loader.gif"/>;
				break;

			case "questioner":
				content = (<Quetioner question={this.state.question}
							          answer={this.state.answer}
							          onAnswerChange={this.handleAnswerChange}
							          onSendAnswerClick={this.handleSendAnswerClick}
							          error={this.state.error}/>);
				break;

			case "game":
				content = (<Game width="800"
								 height="600"
								 gameLink={this.state.gameUrl}
								 setParamsFunction={this.sendAnswersToGame.bind(this)}/>);
				break;
		}

		return (
			
			<div id="QAapp" className="flexContainer">
				{content}
			</div>
		);
		
	}

	enterPressDetecting(e){
		
		if(e.keyCode == 13){		//13 - Enter's code
			this.handleSendAnswerClick()
			e.preventDefault();
		}
	}

	handleAnswerChange(answer){
		this.setState({'answer' : answer});
	}

	handleSendAnswerClick(){
		this.viewEvent.notify({
			'eventType': "answerSending",
			'answer': this.state.answer
		});
	}

	setQuestion(textOfQuestion){
		this.setState({
			'question': textOfQuestion,
			'action' : "questioner"
		});

	}

	showError(textOfError){
		
		this.setState({error: textOfError});
	
	}

	clearError(){
		this.showError("");
	}

	clearAnswerInput(){
		this.setState({answer: ''});		
	}

	showLoader(){
		this.setState({action : "loader", });		
	}

	showGame(answersObj){
		this.setState({
			action : "game",
			answers: answersObj
		});		
	}

	sendAnswersToGame(object){
		//object.contentWindow.postMessage(JSON.stringify(this.state.answers), "*");
		object.contentWindow.postMessage(this.state.answers.name +","+this.state.answers.age, "*");
	}
};

module.exports = QAApp;
