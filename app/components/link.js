// Include React and Axios
var React = require("react");
var axios = require("axios");

// Creating the Form component
export default class LinkID extends React.Component{
	constructor() {
		super();
		this.state = {
			id: "",
			itemInfo: ""
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({id: this.props.value});
		this.props.linkFromID(this.props.value);
	}

	componentDidMount() {
		axios.get("/item/" + this.props.value).then(function(response) {
			this.setState({itemInfo: response.data});
		}.bind(this) );
	}

	render() {
		if (this.state.itemInfo != "") {
			var thumbnail = this.state.itemInfo.media.map(function(image){
				if (image.img_ref_1 != "") {
					return <a href="#top" key={image._id}><img src={image.img_ref_1} height="50" /></a>
				} else {
					return null
				}
			});
		}

		return (
			<div className="col-sm-12" onClick={this.handleClick}>
				<div className="col-sm-6">
					<h4 value={this.props.value}><a href="#top">{this.props.item_title}</a></h4>
				</div>
				<div className="col-sm-6">
					{thumbnail}
				</div>
			</div>
			)
	}

}