// Include React
var React = require("react");

// Creating the Form component
export default class LinkSubj extends React.Component{
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.linkForSubj(this.props.ethn_id);
	}

	render() {
		return <span value={this.props.ethn_id} onClick={this.handleClick}>{this.props.ethn_id}</span>
	}

}