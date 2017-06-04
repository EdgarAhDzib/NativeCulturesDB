var React = require("react");
var axios = require("axios");
import FormID from "./formid";
import FormCulture from "./formcult";
import FormSubject from "./formsubj";
import FormSearch from "./formsearch";
import LinkID from "./link";
import LinkSubj from "./subj";
import LinkCult from "./cult";

export default class Main extends React.Component{
	// TO WORK: this will require at least three forms, each for its own input
	// --> or to clear the other fields when one is being filled
	constructor() {
		super();
		this.state = {
			itemInfo : "",
			cultureInfo : "",
			allCultures: "",
			id: "",
			culture: "",
			subject: "",
			cultMatches: [],
			subjMatches: [],
			searchMatch: [],
			keywords: ""
		}
		this.setFormID = this.setFormID.bind(this);
		this.setFormCult = this.setFormCult.bind(this);
		this.setFormSubj = this.setFormSubj.bind(this);
		this.setFormKeyword = this.setFormKeyword.bind(this);
		this.linkFromID = this.linkFromID.bind(this);
		this.linkForSubj = this.linkForSubj.bind(this);
		this.linkForCult = this.linkForCult.bind(this);
		this.cultureList = this.cultureList.bind(this);
		this.subjectList = this.subjectList.bind(this);
	}

	setFormID(form) {
		this.setState({
			id: form.id,
			culture: form.culture,
			subject: form.subject,
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (form.id != "") {
			axios.get('/item/' + form.id).then(function(response) {
				this.setState({itemInfo: response.data});
			}.bind(this) );
		}
	}

	setFormCult(form) {
		this.setState({
			id: form.id,
			culture: form.culture,
			subject: form.subject,
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (form.culture != "") {
			axios.get('/culture/' + form.culture).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}	
	}

	setFormSubj(form) {
		this.setState({
			id: form.id,
			culture: form.culture,
			subject: form.subject,
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (form.subject != "") {
			axios.get('/subjects/' + form.subject).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}	
	}

	setFormKeyword(results) {
		this.setState({
			id: "",
			culture: "",
			subject: "",
			cultMatches: [],
			subjMatches: [],
			keywords: results
		});
		if (results != "") {
			// console.log(results);
			axios.post('/search/' + results).then(function(response) {
				console.log(response.data);
				this.setState({searchMatch: response.data});
			}.bind(this) );
		}
	}

	linkFromID(linkId) {
		this.setState({
			id : linkId,
			culture : "",
			subject : "",
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (linkId != "") {
			axios.get('/item/' + linkId).then(function(response) {
				this.setState({itemInfo: response.data});
			}.bind(this) );
		}
	}

	linkForSubj(subj) {
		this.setState({
			subject : subj,
			culture: "",
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (subj != "") {
			axios.get('/subjects/' + subj).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}
	}

	linkForCult(culture) {
		this.setState({
			culture : culture,
			subject: "",
			cultMatches: [],
			subjMatches: [],
			keywords: ""
		});
		if (culture != "") {
			axios.get('/culture/' + culture).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}
	}

	cultureList(culture) {
		axios.get('/culturebrowse/' + culture).then(function(response){
			this.setState({ cultMatches: response.data});
		}.bind(this));
	}

	subjectList(subject) {
		axios.get('/subjbrowse/' + subject).then(function(response){
			this.setState({ subjMatches: response.data});
		}.bind(this));
	}

	componentDidMount() {
		axios.get("/item/" + 24).then(function(response) {
			this.setState({itemInfo: response.data});
		}.bind(this) );
		axios.get("/cultures/").then(function(response) {
			this.setState({allCultures: response.data});
		}.bind(this) );
	}

	render() {
		// console.log(this.state.cultureInfo);
		// console.log(this.state);
		/*
		for (let i = 0; i < this.state.allCultures.length; i++) {
			if (this.state.allCultures[i].items.length > 0) {
				console.log(this.state.allCultures[i].group_name);
			}
		}
		*/
		// Map through the group_name for each culture retrieved through the culture browse, make each a LinkCult element
		var linkFromID = this.linkFromID;
		var linkForSubj = this.linkForSubj;
		var linkForCult = this.linkForCult;

		if (this.state.cultureInfo != "" && this.state.cultureInfo != null && this.state.cultureInfo.items.length > 0) {
			var cultureEntries = this.state.cultureInfo.items.map(function(item){
				return <LinkID linkFromID={linkFromID} key={item._id} value={item.id} item_title={item.item_title} />
			});
		}

		if (this.state.searchMatch != [] && this.state.searchMatch != null && this.state.searchMatch.length > 0) {
			if (this.state.keywords != "") {
				var searchHeader = <h3>Results for '{this.state.keywords}'</h3>
			}
			var searchEntries = this.state.searchMatch.map(function(item){
				return <LinkID linkFromID={linkFromID} key={item._id} value={item.id} item_title={item.item_title} />
			});
		}

		if (this.state.itemInfo !== "") {
			var imagesFromArray = this.state.itemInfo.media.map(function(image){
				if (image.img_ref_1 != "" && image.img_ref_1 != "NULL") {
					return <img src={image.img_ref_1} key={image._id} width="300" />
				} else if (image.img_ref_2 != "" && image.img_ref_2 != "NULL") {
					return <img src={image.img_ref_2} key={image._id} width="300" />
				} else if (image.img_ref_3 != "" && image.img_ref_3 != "NULL") {
					return <img src={image.img_ref_3} key={image._id} width="300" />
				} else if (image.img_ref_4 != "" && image.img_ref_4 != "NULL") {
					return <img src={image.img_ref_4} key={image._id} width="300" />
				} else {
					return null
				}
			});
			
			// Write ternary statements to return blank "" if the value is read NULL
			var youtube = this.state.itemInfo.media[0].youtube != "NULL" ? <iframe width="400" height="225" src={"https://www.youtube.com/embed/" + this.state.itemInfo.media[0].youtube} frameBorder="0" allowFullScreen></iframe> : "";
			var ethnNotes = this.state.itemInfo.notes != "NULL" ? this.state.itemInfo.notes : "";
			var mainDesc = this.state.itemInfo.main_desc != "NULL" ? this.state.itemInfo.main_desc : "";
			var longDesc = this.state.itemInfo.long_desc != "NULL" ? this.state.itemInfo.long_desc : "";
			var context = this.state.itemInfo.context != "NULL" ? this.state.itemInfo.context : "";
			var researchNotes = this.state.itemInfo.research_notes != "NULL" ? this.state.itemInfo.research_notes : "";
			var display = this.state.itemInfo.display != "NULL" ? this.state.itemInfo.display : "";
			var primDoc = this.state.itemInfo.prim_doc != "NULL" ? this.state.itemInfo.prim_doc : "";
			var ethnFields = this.state.itemInfo.fields.map(function(field){
				return <span> | <LinkSubj linkForSubj={linkForSubj} key={field._id} ethn_id={field.ethn_id}/> | </span>
				//{field.ethn_id} . </span>
			});
			var sourceRef = this.state.itemInfo.source_refs.map(function(ref, inc){
				return <p key={inc}><a href={ref.url} target="_blank">{ref.url}</a></p>
			});
		}

		if (this.state.cultMatches.length > 0) {
			var tribeNames = this.state.cultMatches.map(function(tribe){
				return <h3><LinkCult linkForCult={linkForCult} value={tribe.group_name} /></h3>
			})
		}

		if (this.state.subjMatches.length > 0) {
			var topicNames = this.state.subjMatches.map(function(topic){
				return <h3><LinkSubj linkForSubj={linkForSubj} ethn_id={topic.name} /></h3>
			})
		}

		return (
			<div>
				<div className="col-sm-8">
					<h1>{this.state.itemInfo.item_title}</h1>
					<h2><LinkCult linkForCult={linkForCult} value={this.state.itemInfo.group} /></h2>
					<div>{ethnFields}</div>
					<div>{imagesFromArray}</div>
					<div>{youtube}</div>
					<div>{ethnNotes}</div>
					<div>{mainDesc}</div>
					<div>{longDesc}</div>
					<div>{context}</div>
					<div>{researchNotes}</div>
					<div>{display}</div>
					<div>{primDoc}</div>
					<div>{sourceRef}</div>
				</div>
				<div className="col-sm-4">
					<FormSearch setFormKeyword={this.setFormKeyword} />
					<FormID setFormID={this.setFormID} />
					<FormCulture setFormCult={this.setFormCult} cultureList={this.cultureList} />
					<FormSubject setFormSubj={this.setFormSubj} subjectList={this.subjectList} />
					<h3></h3>
					<h2>{this.state.culture}</h2>
					<h2>{this.state.subject}</h2>
					{tribeNames}
					{topicNames}
					{searchHeader}
					{searchEntries}
					{cultureEntries}
				</div>
			</div>
		)
	}
}