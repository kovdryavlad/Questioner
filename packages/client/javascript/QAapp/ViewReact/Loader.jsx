'use strict';

const React = require('react');

class Loader extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <img src={this.props.pathToImage} className="loader" />
    }

}

module.exports = Loader;