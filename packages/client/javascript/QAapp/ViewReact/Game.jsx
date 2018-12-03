'use strict';

const React = require('react');

class Game extends React.Component{
	
	constructor(props) {
		super(props);			
	}

	render()
	{
		return (<iframe id="gameIframe"
						width={this.props.width} 
						height={this.props.height} 
						src={this.props.gameLink}>

                    Ваш браузер не поддерживает iframe
                </iframe>);
	}

};

module.exports = Game;