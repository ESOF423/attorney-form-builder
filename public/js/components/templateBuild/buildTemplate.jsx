import React, { Component } from 'react'
import Question from './question.jsx'
import Template from './template.jsx'

class BuildTemplate extends Component {
	
	constructor(){
		super()
		this.state = {
			listDataFromTemplate:" ",
/*			label: '',
			type: '',
			label:[],
			type:[]
*/		}
	}
	myCallback=(listDataFromTemplate)=> {
		this.setState({listDataFromTemplate: listDataFromTemplate})
	this.eachQuestion = this.eachQuestion.bind(this)
	
	eachQuestion(questions, i){
		return(
			<Question 
				key={i}
				index={i}>
				{question.question}
			</Question>
		)
	}

	toString(questions, i){
			const questionType = question.map((words) =>
					{words: [this.question.split(' ')])}
		}
	}

	replace(words, i){
		const wordChar = words.map(word, i) =>
				{var findChar = "$",
				 var char = findChar.indexOf(words[i])
					{
					if(char === -1){
						return
					} else {
					alter : [
					{(while findChar.indexOf != -1){
						var newType += char)}}
						this.alter = newType
					]
					}			
				}
	}

	render() {	
		return (
		<div className="type">
		{this.state.questions.map(function(type, i){
			return type:[ 
				{key={i}>{questions.type}}
				]
			)}
			console.log(type)
	}
		</div>

		<div className="question">
		{this.state.questions.map(function(question, i){
			return question: [
				{key={i}>{questions.question}}
				]
			)}
		console.log(questions)
		}

		<div className="template">
			{listQuestions(props.question)
				{this.state.questions.map(this.eachQuestion)}
			}
			}
			</div>
		)
	}


	export default BuildTemplate
}