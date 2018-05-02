var React = require("react");
var axios = require("axios");
var qs = require("qs");
// import FormID from "./formid";
import FormCulture from "./formcult";
import FormSubject from "./formsubj";
import FormSearch from "./formsearch";
import LinkID from "./link";
import LinkSubj from "./subj";
import LinkCult from "./cult";
import ItemForm from "./itemform";
import PicsModal from "./picsmodal";
import EditForm from "./editform";
import CultMenu from "./cultmenu";
import AboutNACD from "./aboutnacd";
import UserForm from "./userform";
import Login from "./loginform";
import UserInfo from "./userinfo";
import {ModalContainer, ModalBackground, ModalDialog} from "react-modal-dialog";

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
			keywords: "",
			isShowingModal: false,
			secondModal: false,
			editModal: false,
			menuType: "",
			fileOne: {},
			fileTwo: {},
			fileThree: {},
			fileFour: {},
			imgThumbOne: "",
			imgThumbTwo: "",
			imgThumbThree: "",
			imgThumbFour: "",
			mainPanel: "item", // for testing, then revert to "item"
			loggedIn: false,
			active: false,
			userInfo: ""
		}
		var that = this;
		// this.setFormID = this.setFormID.bind(this);
		this.setFormCult = this.setFormCult.bind(this);
		this.setFormSubj = this.setFormSubj.bind(this);
		this.setFormKeyword = this.setFormKeyword.bind(this);
		this.linkFromID = this.linkFromID.bind(this);
		this.linkForSubj = this.linkForSubj.bind(this);
		this.linkForCult = this.linkForCult.bind(this);
		this.cultureList = this.cultureList.bind(this);
		this.subjectList = this.subjectList.bind(this);
		this.showMainModal = this.showMainModal.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.itemSubmit = this.itemSubmit.bind(this);
		this.secondModal = this.secondModal.bind(this);
		this.closeSecond = this.closeSecond.bind(this);
		this.getPictures = this.getPictures.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.itemUpdate = this.itemUpdate.bind(this);
		this.updatePanel = this.updatePanel.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		this.userLogout = this.userLogout.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.submitUserForm = this.submitUserForm.bind(this);
	}
	/*
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
	*/

	setFormCult(form) {
		this.setState({
			// id: form.id,
			culture: form.culture,
			subject: form.subject,
			cultMatches: [],
			subjMatches: [],
			keywords: "",
			searchMatch: []
		});
		if (form.culture != "") {
			axios.get('/culture/' + form.culture).then(function(response) {
				this.setState({cultureInfo: response.data});
			}.bind(this) );
		}	
	}

	setFormSubj(form) {
		this.setState({
			// id: form.id,
			culture: form.culture,
			subject: form.subject,
			cultMatches: [],
			subjMatches: [],
			keywords: "",
			searchMatch: []
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
			keywords: results,
			cultureInfo: []
		});
		if (results != "") {
			// console.log(results);
			axios.post('/search/' + results).then(function(response) {
				// console.log(response.data);
				this.setState({searchMatch: response.data});
			}.bind(this) );
		}
	}

	submitUserForm(form) {
		// axios POST if form contains valid fields
		axios.post('/newuser', form).then(function(response){
			// console.log(response.data);
			// this.setState({loggedIn: response.data.loggedIn});
		}.bind(this) );
		// Then reset form and notify user of account status
		console.log(this);
		// Log user in
		var formProps = {
			email: form.email,
			password: form.password
		};
		this.submitLogin(formProps);
	}

	submitLogin(form) {
		axios.post('/login', form).then(function(response){
			// console.log(response.data);
			this.setState({
				userInfo: response.data,
				loggedIn: response.data.loggedIn,
				active: response.data.active
			});
		}.bind(this) );
	}

	userLogout() {
		axios.get('/logout').then(function(response){
			this.setState({
				loggedIn: false,
				active: false,
				userInfo: ""
			});
		}.bind(this) );
	}

	updateUser(firstName, lastName, cultures) {
		console.log(firstName, lastName, cultures);
	}

	updatePassword(passWordCurr, passWordOne, passWordTwo) {
		console.log(passWordCurr, passWordOne, passWordTwo);
	}

	itemSubmit(form) {
		axios.post('/additem', { 'body': form });
		// This is posting content twice, recheck after modal is closed
		this.setState({
			isShowingModal: false,
			secondModal: false
		});
	}

	itemUpdate(form) {
		var updateObj = {};
		var mediaObj = {};
		var sourceObj = {};
		for (var property in form) {
			if (form.hasOwnProperty(property) && form[property] != "" && form[property] != "NULL") {
				// Redo, the "thumb[n]" property names are being passed instead of "img_ref_[n]", so no proper update
				switch (property.substring(0,5)) {
					case "youtu" : mediaObj[property] = form[property];
					break;
					case "museu" : mediaObj[property] = form[property];
					break;
					case "thumb" :
					var thumbNumb = property.substring(5,6);
					mediaObj['img_ref_' + thumbNumb] = form[property];
					break;
					case "sourc" : sourceObj['url'] = form[property];
					break;
					case "cultu" : updateObj['group'] = form[property];
					break;
					case "maind" : updateObj['main_desc'] = form[property];
					break;
					case "primd" : updateObj['prim_doc'] = form[property];
					break;
					case "title" : updateObj['item_title'] = form[property];
					break;
					default :
					break;
				}
			}
		}
		if (Object.keys(mediaObj).length > 0 && mediaObj.constructor === Object) {
			// Use _id of media_sources document
			if (this.state.itemInfo.hasOwnProperty('media') && this.state.itemInfo.media.length > 0) {
				axios.post("/updatemedia", { 'id': this.state.itemInfo.media[0]._id, 'body': mediaObj });
			}
		}
		if (Object.keys(sourceObj).length === 0 && sourceObj.constructor === Object) {
			// Associate the new source document with the item_index _id
		} else {
			// Use _id of source_refs document
			if (this.state.itemInfo.hasOwnProperty('source_refs') && this.state.itemInfo.source_refs.length > 0) {
				axios.post("/updatesource", { 'id': this.state.itemInfo.source_refs[0]._id, 'body': sourceObj });
			}
		}
		axios.post('/updateitem', { 'id': this.state.itemInfo._id, 'body': updateObj }).then(function(response){
			// console.log(response.data.item_title);
		});

		this.setState({
			isShowingModal: false,
			secondModal: false
		});
		this.linkFromID(this.state.itemInfo._id);
	}

	linkFromID(linkId) {
		this.setState({
			id : linkId,
			culture : "",
			subject : "",
			cultMatches: [],
			subjMatches: [],
			keywords: "",
			mainPanel: "item",
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
			keywords: "",
			searchMatch: []
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
			keywords: "",
			searchMatch: []
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

	secondModal(type) {
		this.setState({
			secondModal:true,
			menuType: type,
		});
	}

	handleClose() {
		this.setState({
			isShowingModal: false,
			editModal: false,
			menuType: ""
		});
	}

	closeSecond() {
		this.setState({secondModal:false});
	}

	showMainModal() {
		this.setState({isShowingModal:true});
	}

	showEditModal() {
		this.setState({
			isShowingModal:true,
			editModal:true
		});
	}

	getPictures(pics) {
		var fileTypeOne = "";
		var fileTypeTwo = "";
		var fileTypeThree = "";
		var fileTypeFour = "";

		if (pics.fileOne instanceof File) {
			var typeOne = pics.fileOne.type.substring(0,5);
			var extensionOne = pics.fileOne.type.indexOf('/');
			fileTypeOne = pics.fileOne.type.substring(extensionOne + 1);
		}
		if (pics.fileTwo instanceof File) {
			var typeTwo = pics.fileTwo.type.substring(0,5);
			var extensionTwo = pics.fileTwo.type.indexOf('/');
			fileTypeTwo = pics.fileTwo.type.substring(extensionTwo + 1);
		}
		if (pics.fileThree instanceof File) {
			var typeThree = pics.fileThree.type.substring(0,5);
			var extensionThree = pics.fileThree.type.indexOf('/');
			fileTypeThree = pics.fileThree.type.substring(extensionThree + 1);
		}
		if (pics.fileFour instanceof File) {
			var typeFour = pics.fileFour.type.substring(0,5);
			var extensionFour = pics.fileFour.type.indexOf('/');
			fileTypeFour = pics.fileFour.type.substring(extensionFour + 1);
		}

		this.setState({
			secondModal:false,
			fileOne: fileTypeOne,
			fileTwo: fileTypeTwo,
			fileThree: fileTypeThree,
			fileFour: fileTypeFour,
			imgThumbOne: pics.imgUrlOne,
			imgThumbTwo: pics.imgUrlTwo,
			imgThumbThree: pics.imgUrlThree,
			imgThumbFour: pics.imgUrlFour,
		});
	}

	uploadPicture(file, name) {
		var d = new Date();
		var timestamp = d.getTime();
		// console.log(timestamp + "." + name);
		var fileName = timestamp + "." + name;
		axios({
			url: `/addmedia`,
			method: 'post',
			data: {
				base64: file,
				name: fileName,
			},
		});
	}

	updatePanel(panel) {
		this.setState({mainPanel: panel});
	}

	componentDidMount() {
		axios.get("/randitem/").then(function(response) {
			this.setState({itemInfo: response.data});
		}.bind(this) );
		axios.get("/cultures/").then(function(response) {
			this.setState({allCultures: response.data});
		}.bind(this) );
		axios.get("/success").then(function(response){
			// console.log(response.data);
			this.setState({
				userInfo: response.data,
				loggedIn: response.data.loggedIn,
				active: response.data.active
			});
		}.bind(this) );
	}

	componentWillUpdate(prevProps, prevState) {
		// console.log("Component Will Update");
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log("Component Did Update");
	}

	render() {
		// console.log(this.state.cultureInfo);
		// console.log(this.state);
		// console.log(this.state.itemInfo);
		// console.log(this.state.loggedIn);
		// console.log(this.state.userInfo);
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
		var youtube = "";
		var img_ref_1 = "";
		var img_ref_2 = "";
		var img_ref_3 = "";
		var img_ref_4 = "";
		var museum = "";
		var fileOne = this.state.fileOne;
		var fileTwo = this.state.fileTwo;
		var fileThree = this.state.fileThree;
		var fileFour = this.state.fileFour;
		var thumbOne = this.state.imgThumbOne;
		var thumbTwo = this.state.imgThumbTwo;
		var thumbThree = this.state.imgThumbThree;
		var thumbFour = this.state.imgThumbFour;
		var itemInfo = this.state.itemInfo;
		var userInfo = this.state.userInfo;
		// Item may be edited only if original to user
		var editable = false;
		if (this.state.itemInfo.hasOwnProperty("_id") && this.state.userInfo.hasOwnProperty("items") && this.state.userInfo.items.length > 0) {
			if (this.state.userInfo.items.indexOf(this.state.itemInfo._id) > -1) {
				editable = true;
			}
		}

		if (this.state.cultureInfo != "" && this.state.cultureInfo != null && this.state.cultureInfo.items.length > 0) {
			var cultureEntries = this.state.cultureInfo.items.map(function(item){
				return <LinkID linkFromID={linkFromID} key={"item" + item._id} value={item._id} item_title={item.item_title} />
			});
		}

		if (this.state.searchMatch != [] && this.state.searchMatch != null && this.state.searchMatch.length > 0) {
			if (this.state.keywords != "") {
				var searchHeader = <h3>Results for '{this.state.keywords}'</h3>
			}
			var searchEntries = this.state.searchMatch.map(function(item){
				return <LinkID linkFromID={linkFromID} key={"search" + item._id} value={item._id} item_title={item.item_title} />
			});
		}

		if (this.state.itemInfo !== "") {
			var imagesFromArray = this.state.itemInfo.media.map(function(image,inc){
				youtube = image.youtube != "NULL" && image.youtube != null && image.youtube != "" ? <iframe key={"youtube"+inc} width="400" height="225" src={"https://www.youtube.com/embed/" + image.youtube} frameBorder="0" allowFullScreen></iframe> : "";
				img_ref_1 = image.img_ref_1 != "" ? <div className="col-sm-6 imgMiddle" style={{height:375}} key={image.img_ref_1}><img src={image.img_ref_1} width="300" style={{maxHeight:375}} className=" img-responsive" /></div> : "";
				img_ref_2 = image.img_ref_2 != "" ? <div className="col-sm-6 imgMiddle" style={{height:375}} key={image.img_ref_2}><img src={image.img_ref_2} width="300" style={{maxHeight:375}} className=" img-responsive" /></div> : "";
				img_ref_3 = image.img_ref_3 != "" ? <div className="col-sm-6 imgMiddle" style={{height:375}} key={image.img_ref_3}><img src={image.img_ref_3} width="300" style={{maxHeight:375}} className=" img-responsive" /></div> : "";
				img_ref_4 = image.img_ref_4 != "" ? <div className="col-sm-6 imgMiddle" style={{height:375}} key={image.img_ref_4}><img src={image.img_ref_4} width="300" style={{maxHeight:375}} className=" img-responsive" /></div> : "";
				museum = image.museum != "NULL" && image.museum != null ? image.museum : "";
			});

			// Write ternary statements to return blank "" if the value is read NULL
			// var youtube = this.state.itemInfo.media[0].youtube != "NULL" ? <iframe width="400" height="225" src={"https://www.youtube.com/embed/" + this.state.itemInfo.media[0].youtube} frameBorder="0" allowFullScreen></iframe> : "";
			var ethnNotes = this.state.itemInfo.notes != "NULL" ? this.state.itemInfo.notes : "";
			var mainDesc = this.state.itemInfo.main_desc != "NULL" ? this.state.itemInfo.main_desc : "";
			var longDesc = this.state.itemInfo.long_desc != "NULL" ? this.state.itemInfo.long_desc : "";
			var context = this.state.itemInfo.context != "NULL" ? this.state.itemInfo.context : "";
			var researchNotes = this.state.itemInfo.research_notes != "NULL" ? this.state.itemInfo.research_notes : "";
			var display = this.state.itemInfo.display != "NULL" ? this.state.itemInfo.display : "";
			var primDoc = this.state.itemInfo.prim_doc != "NULL" ? this.state.itemInfo.prim_doc : "";
			var ethnFields = this.state.itemInfo.fields.map(function(field){
				return <span key={field._id}> | <LinkSubj linkForSubj={linkForSubj} ethn_id={field.ethn_id}/> | </span>
				//{field.ethn_id} . </span>
			});
			var sourceRef = this.state.itemInfo.source_refs.map(function(ref, inc){
				var contributor = ref.hasOwnProperty("contributor") && ref.contributor != "NULL" ? <p>Contributor: {ref.contributor}</p> : null;
				return <div key={inc}>{contributor}<p><a href={ref.url} target="_blank">{ref.url}</a></p></div>
			});
		}

		if (this.state.cultMatches.length > 0) {
			var tribeNames = this.state.cultMatches.map(function(tribe){
				return <h3 key={"tribe"+tribe.group_name}><LinkCult linkForCult={linkForCult} value={tribe.group_name}/></h3>
			})
		}

		if (this.state.subjMatches.length > 0) {
			var topicNames = this.state.subjMatches.map(function(topic){
				return <h3 key={"subject"+topic.name}><LinkSubj linkForSubj={linkForSubj} ethn_id={topic.name} /></h3>
			})
		}

		if (this.state.allCultures.length > 0) {
			var cultureOptions = this.state.allCultures.map(function(tribe, inc){
				return <div key={"cultureName"+inc} className="col-xs-6 col-sm-3 cultureLink"><h4><LinkCult linkForCult={linkForCult} value={tribe.group_name} /></h4></div>
			});
		} else {
			var cultureOptions = "";
		}

		switch (this.state.mainPanel) {
			case "item" :
				var panelContent = <div>
					<h1>{this.state.itemInfo.item_title}</h1>
					<h2><LinkCult linkForCult={linkForCult} value={this.state.itemInfo.group} /></h2>
					<div>{ethnFields}</div>
					<div className="row">
					{img_ref_1}
					{img_ref_2}
					{img_ref_3}
					{img_ref_4}
					</div>
					<div>{youtube}</div>
					<div>{ethnNotes}</div>
					<div>{mainDesc}</div>
					<div>{longDesc}</div>
					<div>{context}</div>
					<div>{researchNotes}</div>
					<div>{display}</div>
					<div>{primDoc}</div>
					<div>{museum}</div>
					<div>{sourceRef}</div>
					</div>
				break;
			case "cultmenu" :
				var panelContent = <div>
						<h3><span onClick={() => this.updatePanel("cultalpha")}>Browse Cultures Alphabetically</span> | <span onClick={() => this.updatePanel("cultmenu")}>Browse Cultures by Language Family</span></h3>
						<div className="col-xs-12">
							<CultMenu linkForCult={linkForCult} />
						</div>
					</div>
				break;
			case "cultalpha" :
				var panelContent = <div>
						<h3><span onClick={() => this.updatePanel("cultalpha")}>Browse Cultures Alphabetically</span> | <span onClick={() => this.updatePanel("cultmenu")}>Browse Cultures by Language Family</span></h3>
						<div className="col-xs-12">
							{cultureOptions}
						</div>
					</div>
			break;
			case "aboutnacd" :
				var panelContent = <AboutNACD/>
			break;
			case "userinfo" :
				var panelContent = <UserInfo updateUser={this.updateUser} updatePassword={this.updatePassword} linkFromID={linkFromID} />
			break;
			default :
				var panelContent = <div></div>
			break;
		}

		return (
			<div>
				{
				this.state.isShowingModal && this.state.loggedIn && this.state.active ?
				<ModalContainer onClose={this.handleClose}>
					<ModalBackground>
						<ModalDialog onClose={this.handleClose} style={{top:'5%',left:'5%'}}>
							<div className="modal">
								{ this.state.editModal && editable ? <EditForm itemInfo={itemInfo} itemUpdate={this.itemUpdate} secondModal={this.secondModal} />  : 
									<ItemForm itemSubmit={this.itemSubmit} secondModal={this.secondModal}
									imgThumbOne={thumbOne} imgThumbTwo={thumbTwo} imgThumbThree={thumbThree} imgThumbFour={thumbFour}
									fileOne={fileOne} fileTwo={fileTwo} fileThree={fileThree} fileFour={fileFour} />
								}
									{
									this.state.secondModal ?
									<ModalContainer onClose={this.closeSecond}>
										<ModalDialog onClose={this.closeSecond} style={{top:'5%',left:'10%'}}>
											<div className="modal">
												<PicsModal getPictures={this.getPictures} />
											</div>
										</ModalDialog>
									</ModalContainer>
									: null}
							</div>
						</ModalDialog>
					</ModalBackground>
				</ModalContainer>
				: null }
				<div className="col-sm-8">
					<a id="top"></a>
					{panelContent}
				</div>
				<div className="col-sm-4">
					{
					this.state.loggedIn ? <button onClick={this.userLogout}>Logout</button>
						: <div>
							<UserForm submitUserForm={this.submitUserForm} />
							<Login submitLogin={this.submitLogin} />
						</div>
					}
					<br/>
					{
						this.state.loggedIn ? 
							<h2><span onClick={() => this.updatePanel("userinfo")} >My Profile</span></h2>
						: null
					}
					<h2><span onClick={() => this.updatePanel("aboutnacd")} >About</span></h2>
					<FormSearch setFormKeyword={this.setFormKeyword} />
					<FormCulture setFormCult={this.setFormCult} cultureList={this.cultureList} />
					<h2><span onClick={() => this.updatePanel("cultalpha")} >Browse All Cultures</span></h2>
					<FormSubject setFormSubj={this.setFormSubj} subjectList={this.subjectList} />
					{
					this.state.loggedIn && this.state.active ?
						<h2><span onClick={this.showMainModal}>Add an Item</span>
						{ editable ? <span> | <span onClick={this.showEditModal}>Edit Item</span>  | <span>Remove Item</span></span> : null}
						</h2>
					: null }
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
// 
//<FormID setFormID={this.setFormID} />