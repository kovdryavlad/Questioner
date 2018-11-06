'use strict';

const React = require('react');

const QuestionTitle = require('./QuestionTitle.jsx');
const AnswerInput = require('./AnswerInput.jsx');
const Error = require('./Error.jsx');

class Questioner extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (

            <div className="questioner flexContainer">
                <QuestionTitle text = {this.props.question}/>

                <AnswerInput value={this.props.answer} 
                    onAnswerChange={this.props.onAnswerChange} 
                    onSendClick={this.props.onSendAnswerClick}/>

                <Error text={this.props.error}/>
            </div>

        );
    }
}

module.exports = Questioner;