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
			cultMatches: []
		}
		this.handleCulture = this.handleCulture.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleCulture(event) {
		this.setState({culture: event.target.value});
		// this.props.cultureList(event.target.value);
		axios.get('/culturebrowse/' + event.target.value).then(function(response){
			this.setState({ cultMatches: response.data});
		}.bind(this));
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
		if (this.state.cultMatches.length > 0) {
			var tribeNames = this.state.cultMatches.map(function(tribe, inc){
				var alt = tribe.alt_name != "NULL" && tribe.alt_name != "" && tribe.hasOwnProperty('alt_name') ? " (" + tribe.alt_name + ")" : "";
				// return <h3 key={"tribe"+tribe.group_name}><LinkCult linkForCult={linkForCult} value={tribe.group_name}/></h3>
				return <option key={"tribeSel" + inc} value={tribe.group_name}>{tribe.group_name}{alt}</option>
			})
		}

		return (
			<div>
				<form>
					<input
						value={this.state.culture}
						type="text"
						id="cultureForm"
						onChange={this.handleCulture}
						list="tribes"
						placeholder="Browse by Culture"
						className="form-control"
					/>
					<datalist id="tribes">{tribeNames}</datalist>
					<div className="pull-left">
						<button type="button" class="btn btn-default btn-sm" onClick={this.handleSubmit}>
							<span className="glyphicon glyphicon-search"></span> Search 
						</button>
					</div>
				</form>
			</div>
		)
	}
}