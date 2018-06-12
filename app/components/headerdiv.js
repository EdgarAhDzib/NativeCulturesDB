// Include React
var React = require("react");
var axios = require("axios");

import FormCulture from "./formcult";
import FormSubject from "./formsubj";
import FormSearch from "./formsearch";

// Creating the Header component
export default class HeaderDiv extends React.Component{
	constructor() {
		super();
		this.state = {
			culture: "",
			subject: "",
			keywords: "",
			searchMatch: []
		}
		this.setFormCult = this.setFormCult.bind(this);
		this.setFormSubj = this.setFormSubj.bind(this);
		this.setFormKeyword = this.setFormKeyword.bind(this);
		this.updatePanel = this.updatePanel.bind(this);
		this.userLogout = this.userLogout.bind(this);
	}

	setFormCult(form) {
		this.setState({
			culture: form.culture,
			subject: "",
			keywords: "",
			searchMatch: []
		});
		if (form.culture != "") {
			axios.get('/culture/' + form.culture).then(function(response) {
				this.props.getCultureForm(response.data, form.culture);
			}.bind(this) );
		}
	}

	setFormSubj(form) {
		this.setState({
			culture: "",
			subject: form.subject,
			keywords: "",
			searchMatch: []
		});
		if (form.subject != "") {
			axios.get('/subjects/' + form.subject).then(function(response) {
				this.props.getCultureForm(response.data, form.subject);
			}.bind(this) );
		}	
	}

	setFormKeyword(results) {
		this.setState({
			culture: "",
			subject: "",
			keywords: results,
			cultureInfo: []
		});
		if (results != "") {
			// console.log(results);
			axios.post('/search', {keywords: results}).then(function(response) {
				// console.log(response.data);
				this.props.getSearchForm(response.data, results);
			}.bind(this) );
		}
	}

	updatePanel(panel) {
		this.props.updatePanel(panel);
	}

	userLogout() {
		this.props.userLogout();
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="row header">
				<div className="col-xs-2"><span style={{fontSize:"2.5em"}}>NACD</span><br/>The Native American Cultures Database</div>
				<div className="col-xs-2"><FormSearch setFormKeyword={this.setFormKeyword} /></div>
				<div className="col-xs-2">
					<FormCulture setFormCult={this.setFormCult} /><br/>
				</div>
				<div className="col-xs-2"><FormSubject setFormSubj={this.setFormSubj} /></div>
				<div className="col-xs-2">
					<div className="headerBtn" onClick={() => this.updatePanel("aboutnacd")} >About</div>
					<div className="headerBtn" onClick={() => this.updatePanel("cultalpha")} >Cultures List</div>
				</div>
				<div className="col-xs-2">
					{
						this.props.loggedIn ? 
							<div>
								<button onClick={this.userLogout}>Logout</button>
								<span onClick={() => this.updatePanel("userinfo")} >My Profile</span>
							</div>
						: <div>Sign Up / Log In</div>
					}
					(Under construction!)
				</div>
			</div>
		)
	}

}