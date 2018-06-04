// Include React
var React = require("react");

// Creating the Login component
export default class Login extends React.Component{
	constructor() {
		super();
		this.state = {
			email : "",
			password: ""
		}
		this.handleUser = this.handleUser.bind(this);
		this.handlePW = this.handlePW.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUser(event) {
		this.setState({email: event.target.value});
	}

	handlePW(event) {
		this.setState({password: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.submitLogin(this.state);
		this.setState({
			email: "",
			password: ""
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Email <input
						value={this.state.email}
						type="email"
						id="emailLogin"
						onChange={this.handleUser}
						className="form-control"
					/><br/>
					Password <input
						value={this.state.password}
						type="password"
						id="LoginPW"
						onChange={this.handlePW}
						className="form-control"
					/><br/>
					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}