// Include React
var React = require("react");
var axios = require("axios");
import LinkCult from "./cult";

// Creating the Form component
export default class CultureGroup extends React.Component{
	constructor() {
		super();
		this.state = {
			tribes: "",
		};
		this.linkForCult = this.linkForCult.bind(this);
	}

	linkForCult(culture) {
		this.setState({culture : culture});
		if (culture != "") {
			axios.get('/culture/' + culture).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}
		this.props.linkForCult(culture);
	}

	componentDidMount() {
		axios.get('/langgroup/' + this.props.family).then(function(response){
			this.setState({tribes: response.data});
		}.bind(this) );
	}

	componentWillReceiveProps(prevProps, prevState) {
	}

	render() {
		var linkForCult = this.linkForCult;
		var handleClick = this.handleClick;
		var groupLinks = "";
		if (this.state.tribes != "") {
			groupLinks = this.state.tribes.map(function(tribelink){
				return <li><LinkCult linkForCult={linkForCult} value={tribelink.group_name}/></li>
			});
		}
		return <ul>{groupLinks}</ul>
	}

}