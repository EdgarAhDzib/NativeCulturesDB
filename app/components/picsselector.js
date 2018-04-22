// Include React
var React = require("react");

// Creating the PicsModal component
export default class PicsSelector extends React.Component{
	constructor() {
		super();
		this.state = {
			action: "",
			image: "",
			imageOptions: "",
			urlField: false,
			urlText: "",
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleText = this.handleText.bind(this);
	}

	handleSelect(event) {
		this.setState({action: event.target.value});
		if (event.target.value == "replaceURL") {
			this.setState({urlField: true});
		}
	}

	handleText(event) {
		this.setState({urlText: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		// Post only the fields with non-blank values, and require title and culture minimally
		this.props.pictureAction(this.state);
		this.setState({
			action: "",
			image: "",
			urlField: false,
		});
	}

	componentDidMount() {
		this.setState({
			image:this.props.imageNum,
			imageOptions: this.props.imageOptions
		});
	}

	render() {
		// Concatenate based on count determined by this.state.imageOptions
		var imageListOptions = [];
		if (this.state.imageOptions > 1) {
			for (let i = 0; i < this.state.imageOptions; i++) {
				if (i != Number(this.props.imageNum) - 1) {
					imageListOptions.push(<option key={i} value={i+1}>Move to Position {i+1}</option>);
				}
			}
		}
		var urlInputField = "";
		if (this.state.urlField) {
			urlInputField = <input type="text" name="urlInputField" size="35" onChange={this.handleText} />
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<select onChange={this.handleSelect}>
					<option value="">Please choose an action</option>
					<option value="remove">Remove Image</option>
					<option value="replaceFile">Replace File</option>
					<option value="replaceURL">Replace URL</option>
					{imageListOptions}
				</select>
				<button type="submit">Select!</button>
				<br/>
				<br/>
				{urlInputField}
			</form>
		)
	}
}