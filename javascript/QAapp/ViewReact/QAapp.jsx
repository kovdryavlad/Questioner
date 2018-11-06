'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const QuestionTitle = require('./QuestionTitle.jsx');
const AnswerInput = require('./AnswerInput.jsx');
const Error = require('./Error.jsx');
const Loader = require('./Loader.jsx');

const Event =  require("../../event.js");

class QAApp extends React.Component{
	
	constructor(props) {

		console.log("I was in QAApp constructor. Your logger");
		
		
		//REACT
		super(props);
	
		this.state = {
			question      : "questionText",
			error         : "errorText",
			answer        : "",
			needShowLoader: false
		};

		this.handleAnswerChange = this.handleAnswerChange.bind(this);

		//Other
		this.viewEvent = new Event(this);
	}

	componentDidMount() {
		this.props.onStart(this);
	}

	render(){

		return (
			<div id="QAapp" class="flexContainer">
				{this.state.needShowLoader?
					<Loader/>
					:
					(
						<div className="questioner flexContainer">
							<QuestionTitle text = {this.state.question}/>

							<AnswerInput value={this.state.answer} 
								onAnswerChange={this.handleAnswerChange} 
								onSendClick={this.onSendAnswerClick.bind(this)}/>

							<Error text={this.state.error}/>
						</div>
					)	
				}
			</div>
		);
		
	}

	handleAnswerChange(answer){
		this.setState({
			'answer' : answer}
			);
			
		this.viewEvent.notify({
			'eventType': "AnswerChange",
			'answer': answer
		});
	}

	onSendAnswerClick(answer){
		this.viewEvent.notify({
			'eventType': "sendAnswer",
			'answer': this.state.answer
		});
	}

	setQuestion(textOfQuestion){
		this.setState({
			'question': textOfQuestion
		});
	}

	showError(textOfError){
		
		this.setState({
			'error': textOfError
		});
	
	}

	clearError(){
		this.showError("");
	}

	clearAnswerInput(){
		this.setState({
			'answer': ''
		});		
	}

	showLoader(){
		this.setState({
			needShowLoader: true
		});		
	}

	hideLoader(){
		this.setState({
			needShowLoader: false
		});	
	}
};

module.exports = QAApp;
