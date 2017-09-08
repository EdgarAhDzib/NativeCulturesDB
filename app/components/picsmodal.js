// Include React
var React = require("react");
// var axios = require("axios");

// Creating the PicsModal component
export default class PicsModal extends React.Component{
	constructor() {
		super();
		this.state = {
			fileOne: "",
			fileTwo: "",
			fileThree: "",
			fileFour: "",
			imgUrlOne: "",
			imgUrlTwo: "",
			imgUrlThree: "",
			imgUrlFour: "",
		}
		this.handlePicOne = this.handlePicOne.bind(this);
		this.handlePicTwo = this.handlePicTwo.bind(this);
		this.handlePicThree = this.handlePicThree.bind(this);
		this.handlePicFour = this.handlePicFour.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		// prevent the HTML from trying to submit a form if the user hits "Enter" instead of clicking the button
		event.preventDefault();
		// Post only the fields with non-blank values, and require title and culture minimally
		this.props.getPictures(this.state);
		this.setState({
			fileOne: "",
			fileTwo: "",
			fileThree: "",
			fileFour: "",
			imgUrlOne: "",
			imgUrlTwo: "",
			imgUrlThree: "",
			imgUrlFour: "",
		});
	}

	handlePicOne(e){
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				fileOne: file,
				imgUrlOne: reader.result
			});
		}
		reader.readAsDataURL(file);
		// if (this.state.imgUrlOne != "") {
		// 	this.setState
		// }
	}

	handlePicTwo(e){
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				fileTwo: file,
				imgUrlTwo: reader.result
			});
		}
		reader.readAsDataURL(file);
		// if (this.state.imgUrlOne != "") {
		// 	this.setState
		// }
	}

	handlePicThree(e){
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				fileThree: file,
				imgUrlThree: reader.result
			});
		}
		reader.readAsDataURL(file);
		// if (this.state.imgUrlOne != "") {
		// 	this.setState
		// }
	}

	handlePicFour(e){
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				fileFour: file,
				imgUrlFour: reader.result
			});
		}
		reader.readAsDataURL(file);
		// if (this.state.imgUrlOne != "") {
		// 	this.setState
		// }
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="col-xs-12 row">
					<div className="col-xs-12">
						<h2>Upload pictures (up to 4)</h2>
					</div>
				</div>
				<div className="col-xs-12 row">
					<div className="col-xs-6 row upload-cell">
						<div className="picHolder">
							{
								this.state.imgUrlOne != "" ?
								<img src={this.state.imgUrlOne} style={{maxHeight:190, maxWidth:190, margin:"auto"}}/>
								: null
							}
						</div>
						<div>
							<input className="fileInput" type="file" onChange={this.handlePicOne} />
						</div>
					</div>
					{ this.state.imgUrlOne != "" ?
					<div className="col-xs-6 row upload-cell">
						<div className="picHolder">
							{
								this.state.imgUrlTwo != "" ?
								<img src={this.state.imgUrlTwo} style={{maxHeight:190, maxWidth:190, margin:"auto"}}/>
								: null
							}
						</div>
						<div>
							<input className="fileInput" type="file" onChange={this.handlePicTwo} />
						</div>
					</div>
					: null
					}
					{ this.state.imgUrlTwo != "" ?
					<div className="col-xs-6 row upload-cell">
						<div className="picHolder">
							{
								this.state.imgUrlThree != "" ?
								<img src={this.state.imgUrlThree} style={{maxHeight:190, maxWidth:190, margin:"auto"}}/>
								: null
							}
						</div>
						<div>
							<input className="fileInput" type="file" onChange={this.handlePicThree} />
						</div>
					</div>
					: null
					}
					{ this.state.imgUrlThree != "" ?
					<div className="col-xs-6 row upload-cell">
						<div className="picHolder">
							{
								this.state.imgUrlFour != "" ?
								<img src={this.state.imgUrlFour} style={{maxHeight:190, maxWidth:190, margin:"auto"}}/>
								: null
							}
						</div>
						<div>
							<input className="fileInput" type="file" onChange={this.handlePicFour} />
						</div>
					</div>
					: null
					}
					<div className="col-xs-12">
					{
						this.state.imgUrlOne != "" || this.state.imgUrlTwo != "" || this.state.imgUrlThree != "" || this.state.imgUrlFour != "" ?
						<input type="submit" onSubmit={this.handleSubmit}/>
						: null
					}
					</div>
				</div>
			</form>
		)
	}
}