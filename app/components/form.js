// Include React
var React = require("react");

// Creating the Form component
export default class Form extends React.Component{
	constructor() {
		super();
		this.state = {
			id : "",
			culture: "",
			subject: ""
		}
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleCulture = this.handleCulture.bind(this);
		this.handleSubject = this.handleSubject.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleIdChange(event) {
		this.setState({id: event.target.value});
	}

	handleCulture(event) {
		this.setState({culture: event.target.value});
	}

	handleSubject(event) {
		this.setState({subject: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.setForm(this.state);
		this.setState({
			id: "",
			culture: "",
			subject : ""
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Browse by ID <input
						value={this.state.id}
						type="text"
						id="id"
						onChange={this.handleIdChange}
					/><br/>
					Browse by Culture <input
						value={this.state.culture}
						type="text"
						id="id"
						onChange={this.handleCulture}
					/><br/>
					Browse by Subject <input
						value={this.state.subject}
						type="text"
						id="id"
						onChange={this.handleSubject}
					/><br/>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}