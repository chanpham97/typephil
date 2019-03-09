import React, { Component } from 'react';
import { normalize } from 'path';
import header from './components/header';

const EASY = "easy";
const MEDIUM = "medium"; 
const HARD = "hard"; 

class SpaceracePlay extends Component {
 constructor(props) {
     super(props); 

     this.state = {
         words: ["hello", "there", "hi"]
     }
 }
    render () {
        return (
            <p>{this.props.difficulty }</p>
        )
    }
}

export default SpaceracePlay; 
