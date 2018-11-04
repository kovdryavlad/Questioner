'use strict';

const React = require('react');

class QuestionTitle extends React.Component{
	
	constructor(props) {
		super(props);			
	}

	render()
	{
		return <p>{this.props.text}</p>;
	}

};

module.exports = QuestionTitle;