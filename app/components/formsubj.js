// Include React
var React = require("react");
var axios = require("axios");

// Creating the Form component
export default class FormSubject extends React.Component{
	constructor() {
		super();
		this.state = {
			id : "",
			culture: "",
			subject: "",
		}
		this.handleSubject = this.handleSubject.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubject(event) {
		this.setState({subject: event.target.value});
		this.props.subjectList(event.target.value);
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.setFormSubj(this.state);
		this.setState({
			subject: ""
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
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