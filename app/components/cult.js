// Include React
var React = require("react");

// Creating the Form component
export default class LinkCult extends React.Component{
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.linkForCult(this.props.value);
	}

	render() {
		return <span key={this.props._id} value={this.props.group_name} onClick={this.handleClick}>{this.props.value}</span>
	}

}