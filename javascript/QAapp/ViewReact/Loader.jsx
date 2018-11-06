'use strict';

const React = require('react');

class Loader extends React.Component{
    
    render(){
        return <img src="./loader.gif" className="loader" />
    }

}

module.exports = Loader;