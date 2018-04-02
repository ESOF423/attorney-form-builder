import React, { Component } from 'react'
import Question from './question'

class Template extends Component {
	constructor(props){
		super(props)
		this.state = {
			questions: [
					{
						type: "name",
						question: "I $name$ being of sound mind, leave my $item$ to my niece."
					},
					{	type: "item",
						question: "I leave my $item$ to $name$."
					}
				]
		}
		this.eachQuestion = this.eachQuestion.bind(this)
	}

	eachQuestion(question, i){
		return(
			<Question 
				key={i}
				index={i}>
				{question.question}
			</Question>
		)
	}

	render() {
		return (
			<div className="template">
				{this.state.questions.map(this.eachQuestion)}
			</div>
		)
	}
}

export default Template