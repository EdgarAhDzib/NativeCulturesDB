// Include React and Axios
var React = require("react");
var axios = require("axios");

// Creating the Form component
export default class LinkID extends React.Component{
	constructor() {
		super();
		this.state = {
			id: "",
			itemInfo: "",
			title: ""
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.linkFromID(this.state.id);
	}

	componentDidMount() {
		axios.get("/item/" + this.props.value).then(function(response) {
			this.setState({
				itemInfo: response.data,
				id: response.data._id,
				title: response.data.item_title
			});
		}.bind(this) );
	}

	componentWillReceiveProps(newProps){
		// console.log("CWRP", newProps.value, newProps.item_title);
		axios.get("/item/" + newProps.value).then(function(response) {
			this.setState({
				id: response.data._id,
				itemInfo: response.data,
				title: response.data.item_title
			});
			// console.log(response.data._id, response.data.item_title, response.data.group);
		}.bind(this) );

	}

	render() {
		// console.log("Link", this.state.itemInfo.item_title + ", " + this.state.itemInfo.group);
		var bkgd = {backgroundColor:"white"};
		if (this.state.id == this.props.currId) {
			bkgd = {backgroundColor:"black"};
		}

		return (
			<div className="col-sm-12 linkItem" height={this.props.height} onClick={this.handleClick} style={bkgd}>
				<div className="col-sm-6">
					<span value={this.state.id} className="itemTitle"><a href="#top">{this.state.itemInfo.item_title + ", " + this.state.itemInfo.group}</a></span>
				</div>
				<div className="col-sm-6">
					{
						this.state.itemInfo != "" && this.state.itemInfo.hasOwnProperty("media") && this.state.itemInfo.media.length > 0 && this.state.itemInfo.media[0].img_ref_1 != "" ? <a href="#top" key={this.state.itemInfo._id}><img src={this.state.itemInfo.media[0].img_ref_1} style={{height:50,maxWidth:130}} /></a> : null
					}
				</div>
			</div>
			)
	}

}