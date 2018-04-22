// Include React
var React = require("react");

// Creating the UserForm component
export default class UserForm extends React.Component{
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			username : "",
			email: "",
			password: ""
		}
		this.handleFirst = this.handleFirst.bind(this);
		this.handleLast = this.handleLast.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePW = this.handlePW.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleFirst(event) {
		this.setState({firstName: event.target.value});
	}

	handleLast(event) {
		this.setState({lastName: event.target.value});
	}

	handleName(event) {
		this.setState({username: event.target.value});
	}

	handleEmail(event) {
		this.setState({email: event.target.value});
	}

	handlePW(event) {
		this.setState({password: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.submitUserForm(this.state);
		this.setState({
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: ""
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					First name <input
						value={this.state.firstName}
						type="text"
						id="userFormFirst"
						onChange={this.handleFirst}
					/><br/>
					Last name <input
						value={this.state.lastName}
						type="text"
						id="userFormLast"
						onChange={this.handleLast}
					/><br/>
					Username <input
						value={this.state.username}
						type="text"
						id="userFormName"
						onChange={this.handleName}
					/><br/>
					Email <input
						value={this.state.email}
						type="email"
						id="userFormEmail"
						onChange={this.handleEmail}
					/><br/>
					Password <input
						value={this.state.password}
						type="password"
						id="userFormPW"
						onChange={this.handlePW}
					/><br/>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}