// Include React
var React = require("react");

// Creating the Form component
export default class FormSearch extends React.Component{
	constructor() {
		super();
		this.state = {
			keywords : "",
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSearch(event) {
		this.setState({keywords: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		// Set the parent to have the search terms
		this.props.setFormKeyword(this.state.keywords);
		this.setState({
			keywords: "",
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Keyword Search <input
						value={this.state.keywords}
						type="text"
						id="searchForm"
						onChange={this.handleSearch}
						placeholder={this.state.keywords}
						className="form-control"
					/>
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