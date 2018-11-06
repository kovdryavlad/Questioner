'use strict';

const React = require('react');

class AnswerInput extends React.Component{
	
	constructor(props) {
		super(props);			
    }
    
    handleChange(e) {
        this.props.onAnswerChange(e.target.value);
      }

	render()
	{
        return (
            <form className="flexContainer">
                <input type="text" value={this.props.answer} onChange={this.handleChange.bind(this)}></input>
                <input type="button" value="Відправити"></input>
            </form>
        );
	}

};

module.exports = AnswerInput;