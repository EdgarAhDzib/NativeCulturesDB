// Include React
var React = require("react");
var axios = require("axios");
import CultureGroup from "./culturegroup";

// Creating the Form component
export default class CultMenu extends React.Component{
	constructor() {
		super();
		this.state = {
			families: "",
			countries: "",
			cultures: "",
		};
		this.linkForCult = this.linkForCult.bind(this);
	}

	linkForCult(culture) {
		this.props.linkForCult(culture);
	}

	componentDidMount() {
		axios.get('/langfamilies').then(function(response){
			this.setState({families : response.data});
		}.bind(this));
	}

	componentWillReceiveProps(prevProps, prevState) {
	}

	render() {
		var familyHeaders = "";
		var linkForCult = this.linkForCult;
		if (this.state.families != "") {
			familyHeaders = this.state.families.map(function(group){
				return <div className="col-sm-4"><h4>{group}</h4><ul><CultureGroup linkForCult={linkForCult} family={group}/></ul></div>
			});
		}
		return <div>{familyHeaders}</div>
	}

}