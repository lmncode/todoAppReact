import React from 'react';

class TodoForm extends React.Component {
	state = {
		newTodo: null
	};
	onChangeInput = (e) => {
		e.preventDefault();
		const newTodo = e.target.value;
		this.setState({
			newTodo: newTodo
		});
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		const inp = e.target.childNodes[0].childNodes[0];
		const todolist = this.props.todolist;
		if (inp.value === '') return;

		for (let i = 0; i < todolist.length; i++) {
			if (todolist[i].text === inp.value) {
				console.log('this todo is exist');

				return;
			}
		}
		console.log(todolist);
		this.props.addTask(this.state.newTodo);
		inp.value = '';
	};

	render() {
		return (
			<form onSubmit={this.onFormSubmit} onChange={this.onChangeInput}>
				<div className="input-group mt-4 mb-4">
					<input type="text" className="form-control" placeholder="Add todo" />
					<div className="input-group-append">
						<button className="btn btn-primary" type="submit">
							Add
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default TodoForm;
