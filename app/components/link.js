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

	/*
	shouldComponentUpdate(prevProps, nextProps) {
		console.log("prevProps");
		console.log(prevProps);
		console.log("nextProps");
		console.log(nextProps);
		return true;
	}
	*/

	render() {
		console.log("Link", this.state.itemInfo.item_title + ", " + this.state.itemInfo.group);
		if (this.state.itemInfo != "") {
			var thumbnail = this.state.itemInfo.media.map(function(image){
				if (image.img_ref_1 != "") {
					return <a href="#top" key={image._id}><img src={image.img_ref_1} style={{height:50,maxWidth:130}} /></a>
				} else {
					return null
				}
			});
		}

		return (
			<div className="col-sm-12" style={{marginBottom:"10px"}} height={this.props.height} onClick={this.handleClick}>
				<div className="col-sm-6">
					<span value={this.state.id} className="itemTitle"><a href="#top">{this.state.itemInfo.item_title + ", " + this.state.itemInfo.group}</a></span>
				</div>
				<div className="col-sm-6 linkItem">
					{thumbnail}
				</div>
			</div>
			)
	}

}