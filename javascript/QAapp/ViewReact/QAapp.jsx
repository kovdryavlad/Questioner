'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const QuestionTitle = require('./QuestionTitle.jsx');
const AnswerInput = require('./AnswerInput.jsx');
const Error = require('./Error.jsx');

const Event =  require("../../event.js");

class QAApp extends React.Component{
	
	constructor(appBlock) {

		console.log("I was in QAApp constructor. Your logger");

		super();		

		this.viewEvent = new Event(this);		
		this.state = {
			question: "questionText",
			error: "errorText",
			answer: ""
		}

		this.handleAnswerChange = this.handleAnswerChange.bind(this);

	}

	handleAnswerChange(answer){
		this.setState({
			'answer' : answer}
			);
			
		this.viewEvent.notify({
			'eventType': "sendAnswer",
			'answer': answer
		});
	}

	render()
	{
		return (
			<div id="QAapp">
				<QuestionTitle text = {this.state.question}/>
				<AnswerInput value={this.state.answer} onAnswerChange={this.handleAnswerChange}/>
				<Error text={this.state.error}/>
			</div>
		);
	}

};

ReactDOM.render(
	<QAApp/>,
	document.getElementById("appContainer")
  );

module.exports = QAApp;
