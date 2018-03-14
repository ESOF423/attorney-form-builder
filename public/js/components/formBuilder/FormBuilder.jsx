import React, { Component } from 'react'
import Dragula from 'react-dragula';
import 'node_modules/dragula/dist/dragula.css'

import 'css/pure.min.css'
import 'css/gravitons.css'

import Question from './Question.jsx'
import QuestionContainer from './QuestionContainer.jsx'

export default class FormBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			questions: [],
			test: ['a', 'b', 'c']
		}
	}

	onChange = (newQuestions) => {
		this.setState({
			questions: newQuestions
		})
	}

	dragulaDecorator = (componentBackingInstance) => {
		if (componentBackingInstance) {
			let options = { };
			const dragula = Dragula([componentBackingInstance], options);
			dragula.on('drop', (el, target, source, sibling) => {
				debugger
				const newColumnIndex = parseInt(target.id);
				const previousColumnIndex = parseInt(source.id);
				const belowId = sibling.id;
				const itemId = el.id;
		
				let columns = this.state.columns;
				if (belowId === undefined) {
				  const newItemIndex = columns[newColumnIndex].items.length;
				  columns[previousColumnIndex].items.splice(columns[previousColumnIndex].items.indexOf(itemId), 1);
				  columns[newColumnIndex].items.splice(newItemIndex, 0, itemId);
				  this.setState({ test: columns });
				}
				else {
				  const newItemIndex = columns[newColumnIndex].items.indexOf(belowId);
				  columns[previousColumnIndex].items.splice(columns[previousColumnIndex].items.indexOf(itemId), 1);
				  columns[newColumnIndex].items.splice(newItemIndex, 0, itemId);
				  this.setState({test: columns});
				}
		
				if (this.props.onDrag !== undefined) {
				  this.props.onDrag(columns);
				}
			  })
		  }
	}

	render() {

		let testItems = this.state.test.map((it, i) => {
			return <div style={{border: 'solid 1px green', margin: '5px'}} key={i}>{it}</div>
		})
		
		return (
			<div>
				<h1>Form Builder</h1>

				<form className="pure-form">
					<QuestionContainer isRoot={true} questions={this.state.questions} onChange={this.onChange}/>
				</form>
				{JSON.stringify(this.state.questions)}

				<div ref={this.dragulaDecorator}>
					{testItems}
				</div>
				{JSON.stringify(this.state.test)}
			</div>
		)
	}
}
