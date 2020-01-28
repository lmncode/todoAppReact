import React from 'react';
import TodoForm from './TodoForm';
import './App.css';

class App extends React.Component {
	state = {
		todolist: [
			{
				id: 1,
				text: 'todo1',
				isDone: false
			}
		],

		status: 'All'
	};

	renderTodoList = () => {
		const todolist = this.state.todolist.map((todo) => {
			//Filter 'All'
			if (this.state.status === 'All') {
				let classes = `todo`;

				if (todo.isDone) {
					classes += ' done';
				}

				return (
					<li
						key={todo.id}
						href="#"
						className="list-group-item list-group-item-success d-flex justify-content-between align-items-center"
					>
						<p id={todo.id} className={classes} value={todo.text} onClick={this.completeTask}>
							{todo.text}
						</p>

						<div className="btns">
							<button className="btn btn-danger" onClick={this.removeTask}>
								X
							</button>
						</div>
					</li>
				);
			}
			//Filter 'Completed'
			if (this.state.status === 'Completed') {
				if (todo.isDone) {
					return (
						<li
							key={todo.id}
							href="#"
							className="list-group-item list-group-item-success d-flex justify-content-between align-items-center"
						>
							<p id={todo.id} className="todo done" value={todo.text} onClick={this.completeTask}>
								{todo.text}
							</p>

							<div className="btns">
								<button className="btn btn-danger" onClick={this.removeTask}>
									X
								</button>
							</div>
						</li>
					);
				}
			}
			//Filter Uncompleted
			if (this.state.status === 'Uncompleted') {
				if (todo.isDone === false) {
					return (
						<li
							key={todo.id}
							href="#"
							className="list-group-item list-group-item-success d-flex justify-content-between align-items-center"
						>
							<p id={todo.id} className="todo" value={todo.text} onClick={this.completeTask}>
								{todo.text}
							</p>

							<div className="btns">
								<button className="btn btn-danger" onClick={this.removeTask}>
									X
								</button>
							</div>
						</li>
					);
				}
			}

			return null;
		});

		return todolist;
	};

	completeTask = (e) => {
		const newtodolist = this.state.todolist;
		newtodolist.map((todo) => {
			if (parseFloat(e.target.id) === todo.id) todo.isDone = !todo.isDone;
			return null;
		});
		this.setState({
			todolist: newtodolist
		});
	};

	addTask = (item) => {
		const updatedList = this.state.todolist;

		updatedList.push({
			id: Math.random(),
			text: item,
			isDone: false
		});
		this.setState({
			todolist: updatedList
		});
	};

	removeTask = (e) => {
		e.preventDefault();
		let updatedList = this.state.todolist;
		const id = parseFloat(e.target.parentNode.parentNode.childNodes[0].id);
		updatedList = updatedList.filter((item) => {
			return item.id !== id;
		});
		this.setState({
			todolist: updatedList
		});
	};

	render() {
		let todolist;
		if (!this.state.todolist.length) todolist = <p>You have no todo</p>;
		else todolist = this.renderTodoList();
		return (
			<div className="container">
				<h1>TodoList</h1>
				<TodoForm addTask={this.addTask} todolist={this.state.todolist} />
				<div className="btn-group mb-4">
					<button type="button" className="btn btn-primary" onClick={() => this.setState({ status: 'All' })}>
						All
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => this.setState({ status: 'Uncompleted' })}
					>
						Uncompleted
					</button>
					<button
						type="button"
						className="btn btn-success"
						onClick={() => this.setState({ status: 'Completed' })}
					>
						Completed
					</button>
				</div>
				<div className="list-group">{todolist}</div>
			</div>
		);
	}
}

export default App;
