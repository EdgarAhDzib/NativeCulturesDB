// Include React
var React = require("react");
var axios = require("axios");

// Creating the Form component
export default class ItemForm extends React.Component{
	constructor() {
		super();
		this.state = {
			title: "",
			culture: "",
			maindesc: "",
			primdoc: "",
			fileOne: "",
			fileTwo: "",
			fileThree: "",
			fileFour: "",
			thumb1: "",
			thumb2: "",
			thumb3: "",
			thumb4: "",
			youtube: "",
			ytURL: "",
			museum: "",
			sourceURL: "",
			cultOptions: []
		}
		this.handleCulture = this.handleCulture.bind(this);
		this.handlePics = this.handlePics.bind(this);
		this.handleSubj = this.handleSubj.bind(this);
		this.handleYoutube = this.handleYoutube.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleDesc = this.handleDesc.bind(this);
		this.handleMuseum = this.handleMuseum.bind(this);
		this.handleSource = this.handleSource.bind(this);
	}

	handleTitle(event) {
		this.setState({title: event.target.value});
	}

	handleCulture(event) {
		this.setState({culture: event.target.value});
	}

	handlePics(event) {
		this.props.secondModal("pics");
	}

	handleSubj(event) {
		this.props.secondModal("subj");
	}

	handleYoutube(event) {
		// Handle these characters only if they exist, otherwise operating upon non-existing ones throws console errors
		var yt_id = "";
		if (event.target.value.includes('v=')) {
			yt_id = event.target.value.split('v=')[1];
		}
		var ampPos = -1;
		if (yt_id.includes('&')) {
			ampPos = yt_id.indexOf('&');
		}
		if(ampPos != -1) {
			yt_id = yt_id.substring(0, ampersandPosition);
		}
		// If YouTube id is valid, generate script to prepare thumbnail in form
		this.setState({ytURL: event.target.value});
		if (yt_id.length >= 11) {
			this.setState({youtube: yt_id});
		}
	}

	handleDesc(event) {
		this.setState({maindesc: event.target.value});
	}

	handleMuseum(event) {
		this.setState({museum: event.target.value});
	}

	handleSource(event) {
		this.setState({sourceURL: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		// Post only the fields with non-blank values, and require title and culture minimally
		this.props.itemSubmit(this.state);
		this.setState({
			title: "",
			culture: "",
			maindesc: "",
			primdoc: "",
			thumb1: "",
			thumb2: "",
			thumb3: "",
			thumb4: "",
			youtube: "",
			ytURL: "",
			museum: "",
			sourceURL: ""
		});
	}

	componentDidMount() {
		axios.get("/cultures/").then(function(response) {
			this.setState({cultOptions: response.data});
		}.bind(this) );
	}

	componentWillReceiveProps(prevProps, prevState) {
		this.setState({
			fileOne: prevProps.fileOne,
			fileTwo: prevProps.fileTwo,
			fileThree: prevProps.fileThree,
			fileFour: prevProps.fileFour,
			thumb1: prevProps.imgThumbOne,
			thumb2: prevProps.imgThumbTwo,
			thumb3: prevProps.imgThumbThree,
			thumb4: prevProps.imgThumbFour
		});
	}

	render() {
		var cultSelector = this.state.cultOptions.map(function(tribe){
			var alt = tribe.alt_name != "NULL" && tribe.alt_name != "" && tribe.hasOwnProperty('alt_name') ? " (" + tribe.alt_name + ")" : "";
			return <option>{tribe.group_name}{alt}</option>
		});
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="col-xs-12 row">
					<div className="col-xs-12">
						<h2>Add an item</h2>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-6">
						<h4>Title: <br/>
						<input type="text" id="titleField" size="30" onChange={this.handleTitle} /></h4>
					</div>
					<div className="col-xs-6">
						<h4>Culture / Tribe: <input type="text" id="cultureField" list="tribes" onChange={this.handleCulture} />
						<datalist id="tribes">{cultSelector}</datalist></h4>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-6">
						<h3 onClick={this.handlePics}>Pictures</h3>
					</div>
					<div className="col-xs-6">
						<h3 onClick={this.handleSubj}>Subjects</h3>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-3">
						{ this.props.imgThumbOne != "" ? <img src={this.props.imgThumbOne} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.props.imgThumbTwo != "" ? <img src={this.props.imgThumbTwo} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.props.imgThumbThree != "" ? <img src={this.props.imgThumbThree} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.props.imgThumbFour != "" ? <img src={this.props.imgThumbFour} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
				</div>
				<div style={{verticalAlign:top}} className="col-xs-12 row">
					<div className="col-xs-9" style={{height:54}}>
						<h4>Video link (online) : <input value={this.state.ytURL} type="text" id="youTubeField" size="42" onChange={this.handleYoutube}/>
						</h4>
					</div>
					<div className="col-xs-3">
						{this.state.youtube.length >= 11 ? <iframe width="96" height="54" src={"https://www.youtube.com/embed/" + this.state.youtube} frameBorder="0" allowFullScreen />
						: null }
					</div>
				</div>
				<br/>&nbsp;<br/>
				<div className="col-xs-12 row">
					<div className="col-xs-12">
						<h4>Description:</h4>
						<textarea id="descField" rows="8" cols="80" onChange={this.handleDesc}>
						</textarea>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-9">
						<h4>Museum: <input value={this.state.museum} type="text" id="museumSource" onChange={this.handleMuseum} /></h4>
						<h4>Source: <input value={this.state.sourceURL} type="text" id="sourceURL" onChange={this.handleSource} /></h4>
					</div>
					<div className="col-xs-3">
						<button type="submit">Add Item!</button>
					</div>
				</div>
			</form>
		)
	}
}