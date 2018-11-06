'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const QuestionTitle = require('./QuestionTitle.jsx');
const AnswerInput = require('./AnswerInput.jsx');
const Error = require('./Error.jsx');

const Event =  require("../../event.js");

class QAApp extends React.Component{
	
	constructor() {

		console.log("I was in QAApp constructor. Your logger");
		
		
		//REACT
		super();		
	
		this.state = {
			'question': "questionText",
			'error': "errorText",
			'answer': ""
		}

		this.handleAnswerChange = this.handleAnswerChange.bind(this);

		//Other
		this.viewEvent = new Event(this);	
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render(){

		return (
			<div id="QAapp">
				<QuestionTitle text = {this.state.question}/>
				<AnswerInput value={this.state.answer} onAnswerChange={this.handleAnswerChange}/>
				<Error text={this.state.error}/>
			</div>
		);
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

	setQuestion(textOfQuestion){
		this.setState({
			'question': textOfQuestion
		});
	}

	showError(textOfError){
		if(this._isMounted){
			this.setState({
				'error': textOfError
			});
		}
	}

	clearError(){
		this.showError("");
	}

	clearAnswerInput(){
		this.setState({
			'answer': ''
		});		
	}
};

module.exports = QAApp;
