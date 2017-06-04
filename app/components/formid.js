// Include React
var React = require("react");

// Creating the Form component
export default class FormID extends React.Component{
	constructor() {
		super();
		this.state = {
			id : ""
		}
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleIdChange(event) {
		this.setState({id: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();

		// Set the parent to have the search term
		this.props.setFormID(this.state);
		this.setState({ id: "" });
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
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}