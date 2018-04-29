// Include React
var React = require("react");
var axios = require("axios");
import LinkID from "./link";

// Creating the UserForm component
export default class UserInfo extends React.Component{
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			userName: "",
			passWordCurr: "",
			passWordOne: "",
			passWordTwo: "",
			items: [],
			cultures: []
		}
		this.handleFirst = this.handleFirst.bind(this);
		this.handleLast = this.handleLast.bind(this);
		this.handlePWCurr = this.handlePWCurr.bind(this);
		this.handlePWOne = this.handlePWOne.bind(this);
		this.handlePWTwo = this.handlePWTwo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.linkFromID = this.linkFromID.bind(this);
	}

	handleFirst(event) {
		this.setState({firstName: event.target.value});
	}

	handleLast(event) {
		this.setState({lastName: event.target.value});
	}

	handlePWCurr(event) {
		this.setState({passWordCurr: event.target.value});
	}

	handlePWOne(event) {
		this.setState({passWordOne: event.target.value});
	}

	handlePWTwo(event) {
		this.setState({passWordTwo: event.target.value});
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		this.props.updateUser(this.state.firstName, this.state.lastName, this.state.cultures);
	}

	changePassWord(event) {
		event.preventDefault();
		this.props.updatePassword(this.state.passWordCurr, this.state.passWordOne, this.state.passWordTwo);
	}

	linkFromID(linkId) {
		this.props.linkFromID(linkId);
	}

	componentDidMount() {
		axios.get("/user/").then(function(response) {
			// console.log(response.data);
			this.setState({
				firstName: response.data.firstName,
				lastName: response.data.lastName,
				userName: response.data.username,
				items: response.data.items,
				cultures: response.data.cultures
			});
		}.bind(this) );
	}

	render() {
		var linkFromID = this.linkFromID;
		var cultures = "";
		if (this.state.cultures.length > 0) {
			cultures = this.state.cultures.map(function(culture, inc){
				return <h4 key={"userCulture"+inc}>{culture}</h4>;
			});
		}
		var items = "";
		if (this.state.items.length > 0) {
			items = this.state.items.map(function(item, inc){
				return <LinkID linkFromID={linkFromID} key={"userItem" + inc} value={item._id} item_title={item.item_title} />;
			});
		}
		return (
			<div>
				<h3>{this.state.userName}</h3>
				<form onSubmit={this.handleSubmit}>
					First name <input
						value={this.state.firstName}
						type="text"
						id="userInfoFirst"
						placeholder={this.state.firstName}
						onChange={this.handleFirst}
					/><br/>
					Last name <input
						value={this.state.lastName}
						type="text"
						id="userInfoLast"
						placeholder={this.state.lastName}
						onChange={this.handleLast}
					/><br/>
					<button type="submit">Submit</button>
				</form>
				<div>
					<h4>My Culture List</h4>
					{cultures}
				</div><br/>
				<div>
					<h4>My Items</h4>
					{items}
				</div>
				<form id="changePW">
					Current password <input
						value={this.state.passWordCurr}
						type="password"
						id="userInfoPWCurr"
						onChange={this.handlePWCurr}
					/><br/>
					New password <input
						value={this.state.passWordOne}
						type="password"
						id="userInfoPWOne"
						onChange={this.handlePWOne}
					/><br/>
					Repeat password <input
						value={this.state.passWordTwo}
						type="password"
						id="userInfoPWTwo"
						onChange={this.handlePWTwo}
					/><br/>
				</form>
			</div>
		)
	}
}