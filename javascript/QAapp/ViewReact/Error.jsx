'use strict';

const React = require('react');

class Error extends React.Component{
	
	constructor(props) {
		super(props);			
	}

	render()
	{
		return <p class="error">{this.props.text}</p>;
	}

};

module.exports = Error;