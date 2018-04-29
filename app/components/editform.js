// Include React
var React = require("react");
var axios = require("axios");
import {ModalContainer, ModalBackground, ModalDialog} from "react-modal-dialog";
import PicsSelector from "./picsselector";

// Creating the Form component
export default class EditForm extends React.Component{
	constructor() {
		super();
		this.state = {
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
			sourceURL: "",
			cultOptions: [],
			isShowingModal: false,
			imageNum: 0,
			imageList: 0,
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
		this.handlePrimDoc = this.handlePrimDoc.bind(this);
		this.picsSelectorModal = this.picsSelectorModal.bind(this);
		this.pictureAction = this.pictureAction.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.rearrangePics = this.rearrangePics.bind(this);
		this.shiftThumbs = this.shiftThumbs.bind(this);
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
		this.setState({
			ytURL: event.target.value
		});
		if (yt_id.length >= 11) {
			this.setState({youtube: yt_id});
		}
	}

	handleDesc(event) {
		this.setState({maindesc: event.target.value});
	}

	handlePrimDoc(event) {
		this.setState({primdoc: event.target.value});
	}

	handleMuseum(event) {
		this.setState({museum: event.target.value});
	}

	handleSource(event) {
		this.setState({sourceURL: event.target.value});
	}

	picsSelectorModal(image) {
		this.setState({
			isShowingModal:true,
			imageNum: image
		});
	}

	pictureAction(option) {
		this.setState({isShowingModal:false});
		switch (option.action) {
			case "remove" :
				this.shiftThumbs(option.image, option.imageOptions);
				break;
			case "replaceURL" :
				if (option.urlText != "" && option.urlText.match(/\.(jpeg|jpg|gif|png)$/) != null) {
					var dynamicObj = {};
					dynamicObj['thumb' + option.image] = option.urlText;
					this.setState(dynamicObj);
				}
				break;
			case "replaceFile" :
				console.log("Replace File");
				break;
			case "1" :
				this.rearrangePics(option.image, this.state['thumb'+option.image], "1", this.state.thumb1);
				break;
			case "2" :
				this.rearrangePics(option.image, this.state['thumb'+option.image], "2", this.state.thumb2);
				break;
			case "3" :
				this.rearrangePics(option.image, this.state['thumb'+option.image], "3", this.state.thumb3);
				break;
			case "4" :
				this.rearrangePics(option.image, this.state['thumb'+option.image], "4", this.state.thumb4);
				break;
			default :
				break;
		}
	}

	shiftThumbs(currThumb, allThumbs) {
		var dynamicObj = {};
		for (let i = currThumb; i <= allThumbs; i++) {
			if (i == currThumb) {
				dynamicObj['thumb' + i] = "";
				this.setState(dynamicObj);
			} else {
				dynamicObj['thumb' + (i - 1)] = this.state['thumb'+i];
				this.setState(dynamicObj);
			}
			if (i == allThumbs) {
				dynamicObj['thumb' + i] = "";
				this.setState(dynamicObj);
			}
		}
		// Update the number of thumbnails, pass the value of allThumbs - 1 so that the picsselector and edit form have the newly truncated number of thumbnail options
		this.setState({imageList: allThumbs - 1});
	}

	rearrangePics(thumbA, urlA, thumbB, urlB) {
		var rearrangeThumbs = {};
		var thumbOne = 'thumb' + thumbA.toString();
		var thumbTwo = 'thumb' + thumbB;
		rearrangeThumbs[thumbOne] = urlB;
		rearrangeThumbs[thumbTwo] = urlA;
		this.setState(rearrangeThumbs);
	}

	handleClose() {
		this.setState({ isShowingModal: false });
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		// Post only the fields with non-blank values, and require title and culture minimally
		var submitObj = {
			title: this.state.title,
			culture: this.state.culture,
			maindesc: this.state.maindesc,
			primdoc: this.state.primdoc,
			thumb1: this.state.thumb1,
			thumb2: this.state.thumb2,
			thumb3: this.state.thumb3,
			thumb4: this.state.thumb4,
			youtube: this.state.youtube,
			museum: this.state.museum,
			sourceURL: this.state.sourceURL
		};
		this.props.itemUpdate(submitObj);
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
			sourceURL: "",
			imageNum: 0,
			imageList: 0,
		});
	}

	componentDidMount() {
		// console.log(this.props.itemInfo);
		this.setState({
			title: this.props.itemInfo.item_title,
			culture: this.props.itemInfo.group,
			maindesc: this.props.itemInfo.main_desc,
			primdoc: this.props.itemInfo.prim_doc,
			thumb1: this.props.itemInfo.media.length > 0 ? this.props.itemInfo.media[0].img_ref_1 : "",
			thumb2: this.props.itemInfo.media.length > 0 ? this.props.itemInfo.media[0].img_ref_2 : "",
			thumb3: this.props.itemInfo.media.length > 0 ? this.props.itemInfo.media[0].img_ref_3 : "",
			thumb4: this.props.itemInfo.media.length > 0 ? this.props.itemInfo.media[0].img_ref_4 : "",
			youtube: this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].hasOwnProperty('youtube') && this.props.itemInfo.media[0].youtube != "NULL" ? this.props.itemInfo.media[0].youtube : "",
			ytURL: this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].hasOwnProperty('youtube') && this.props.itemInfo.media[0].youtube != "NULL" && this.props.itemInfo.media[0].youtube != "" ? "https://www.youtube.com/watch?v=" + this.props.itemInfo.media[0].youtube : "",
			museum: this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].museum != "NULL" ? this.props.itemInfo.media[0].museum : "",
			sourceURL: this.props.itemInfo.source_refs.length > 0 && this.props.itemInfo.source_refs[0].hasOwnProperty('url') ? this.props.itemInfo.source_refs[0].url : ""
		});
		if (this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].img_ref_1 != "") {
			this.setState({ imageList: 1 });
		}
		if (this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].img_ref_2 != "") {
			this.setState({ imageList: 2 });
		}
		if (this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].img_ref_3 != "") {
			this.setState({ imageList: 3 });
		}
		if (this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].img_ref_4 != "") {
			this.setState({ imageList: 4 });
		}
		axios.get("/cultures/").then(function(response) {
			this.setState({cultOptions: response.data});
		}.bind(this) );
	}

	render() {
		// console.log(this.state);
		var cultSelector = this.state.cultOptions.map(function(tribe, inc){
			var alt = tribe.alt_name != "NULL" && tribe.alt_name != "" && tribe.hasOwnProperty('alt_name') ? " (" + tribe.alt_name + ")" : "";
			return <option key={"tribeOpt" + inc} value={tribe.group_name}>{tribe.group_name}{alt}</option>
		});
		return (
		<div>
			{ this.state.isShowingModal ? <ModalContainer onClose={this.handleClose}>
					<ModalBackground>
						<ModalDialog onClose={this.handleClose} style={{top:'20%',left:'20%'}}>
							<div className="modal">
								<PicsSelector pictureAction={this.pictureAction} imageNum={this.state.imageNum} imageOptions={this.state.imageList} />
							</div>
						</ModalDialog>
					</ModalBackground>
				</ModalContainer>
				: null
			}

			<form onSubmit={this.handleSubmit}>
				<div className="col-xs-12 row">
					<div className="col-xs-12">
						<h2>Edit item</h2>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-6">
						<h4>Title: <br/>
						<input type="text" id="titleField" size="30" value={this.state.title} onChange={this.handleTitle} /></h4>
					</div>
					<div className="col-xs-6">
						<h4>Culture / Tribe: <input type="text" id="cultureField" list="tribes" value={this.state.culture} onChange={this.handleCulture} />
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
						{ this.state.thumb1 != "" ? <img src={this.state.thumb1} onClick={() => this.picsSelectorModal(1)} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.state.thumb2 != "" ? <img src={this.state.thumb2} onClick={() => this.picsSelectorModal(2)} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.state.thumb3 != "" ? <img src={this.state.thumb3} onClick={() => this.picsSelectorModal(3)} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
					<div className="col-xs-3">
						{ this.state.thumb4 != "" ? <img src={this.state.thumb4} onClick={() => this.picsSelectorModal(4)} style={{maxHeight:50, maxWidth:50, margin:"auto"}}/>
						: null }
					</div>
				</div>
				<div style={{verticalAlign:top}} className="col-xs-12 row">
					<div className="col-xs-9" style={{height:54}}>
						<h4>Video link (online) : <input value={ this.state.ytURL != "" ? this.state.ytURL : ""} type="text" id="youTubeField" size="42" onChange={this.handleYoutube}/>
						</h4>
					</div>
					<div className="col-xs-3">
						{ this.props.itemInfo.media.length > 0 && this.props.itemInfo.media[0].hasOwnProperty('youtube') && this.state.youtube.length >= 11 ? <iframe width="96" height="54" src={"https://www.youtube.com/embed/" + this.state.youtube} frameBorder="0" allowFullScreen />
						: null }
					</div>
				</div>
				<br/>&nbsp;<br/>
				<div className="col-xs-12 row">
					<div className="col-xs-12">
						<h4>Description:</h4>
						<textarea id="descField" value={this.state.maindesc != "NULL" ? this.state.maindesc : this.state.primdoc} rows="8" cols="80" onChange={this.state.maindesc != "NULL" ? this.handleDesc : this.handlePrimDoc}>
						</textarea>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-9">
						<h4>Museum: <input value={this.state.museum} type="text" id="museumSource" onChange={this.handleMuseum} /></h4>
						<h4>Source: <input value={this.state.sourceURL} type="text" id="sourceURL" onChange={this.handleSource} /></h4>
					</div>
					<div className="col-xs-3">
						<button type="submit">Update!</button>
					</div>
				</div>
			</form>
		</div>
		)
	}
}