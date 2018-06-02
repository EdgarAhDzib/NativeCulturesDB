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
			subjMatches: []
		}
		this.handleSubject = this.handleSubject.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubject(event) {
		this.setState({subject: event.target.value});
		// this.props.subjectList(event.target.value);
		axios.get('/subjbrowse/' + event.target.value).then(function(response){
			this.setState({ subjMatches: response.data});
		}.bind(this));
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
		if (this.state.subjMatches.length > 0) {
			var subjects = this.state.subjMatches.map(function(subj, inc){
				// console.log(subj);
				return <option key={"subjSel" + inc} value={subj.name}>{subj.name}</option>
			})
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Browse by Subject <input
						value={this.state.subject}
						type="text"
						id="subjectForm"
						onChange={this.handleSubject}
						list="subjects"
						placeholder={this.state.subject}
						className="form-control"
					/>
					<datalist id="subjects">{subjects}</datalist>
					<div className="pull-right">
						<button type="button" class="btn btn-default btn-sm" onClick={this.handleSubmit}>
							<span className="glyphicon glyphicon-search"></span> Search 
						</button>
					</div>
				</form>
			</div>
		)
	}
}