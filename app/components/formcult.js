// Include React
var React = require("react");
var axios = require("axios");

// Creating the Form component
export default class FormCulture extends React.Component{
	constructor() {
		super();
		this.state = {
			id : "",
			culture: "",
			subject: "",
		}
		this.handleCulture = this.handleCulture.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCulture(event) {
		this.setState({culture: event.target.value});
		this.props.cultureList(event.target.value);
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.setFormCult(this.state);
		this.setState({
			culture: ""
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Browse by Culture <input
						value={this.state.culture}
						type="text"
						id="id"
						onChange={this.handleCulture}
					/><br/>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}