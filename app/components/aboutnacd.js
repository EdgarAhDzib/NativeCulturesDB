// Include React
var React = require("react");

// Creating the AboutNACD component
export default class AboutNACD extends React.Component{
	constructor() {
		super();
		this.state = {}
	}

	render() {
		return (
			<div>
				<h3>About the Native American Cultures Database</h3>
				<div className="col-xs-3"><a href="#purpose">PURPOSE</a></div>
				<div className="col-xs-3"><a href="#author">AUTHORS</a></div>
				<div className="col-xs-3"><a href="#tech">TECHNOLOGY</a></div>
				<div className="col-xs-3"><a href="#dedication">DEDICATION</a></div>
				<br/><br/>
				<a id="purpose"></a>
				<h4>Purpose</h4>
				<p>The Native American Cultures Database (NACD) is an open, multimedia encyclopedia of Native cultures from ancient to modern times. Native or scholarly contributors may add new content by signing up for an account, and all drafts will be reviewed by tribal and professional experts to ensure their quality and appropriateness.</p>
				<p>The NACD was founded to be a free resource for Natives, students, and scholars to learn about the cultural features of indigenous societies from North to South America. While the Cultures index offers lists of materials for distinct societies, the Subjects index invites comparative studies based on common topics. The ultimate principle of this format is to recognize both the diverse expressions across the Americas and the cultural commonalities they also reflect. These are significant approaches for students and scholars to apply.</p>
				<p>Lastly, a fundamental aim of this database is to invite Native members not only to share materials they find noteworthy about their cultures but also to discover how they could resemble subjects from others'. This work seeks to promote unity and dialogue through the sharing of wisdom and vision.</p>
				<a id="author"></a>
				<h4>The Author</h4>
				<h5>Edgar Martin del Campo-Espinoza</h5>
				<p>Edgar received his doctorate in anthropology at the University at Albany, where he wrote his dissertation on the cultural and political conditions shaping native vocabularies on the supernatural in Veracruz, Mexico. He received a Fulbright-Garc&iacute;a Robles research grant to conduct this fieldwork.</p>
				<p>For eight years Edgar taught undergraduate anthropology, with emphasis on religious, indigenous, and Latin American topics. Heir to Aztec scholarship on his father's side and Cora shamanism on his mother's, Edgar has defined his career in Native American studies through professional research and spiritual practice.</p>
				<p><em><a href="mailto:edgarmdcesp@gmail.com">edgarmdcesp@gmail.com</a></em></p>
				<a id="tech"></a>
				<h4>Technology</h4>
				<p>The NACD is a full-stack MERN (&quot;Mongo-Express-React-Node&quot;) application with MVC (&quot;Model-View-Controller&quot;) framework.</p>
				<p>Back-end programs were written with Node / Express JS, and the app's Express routes process GET / POST commands. Its Node packages include Mongoose, Path, and Body-Parser.</p>
				<p>Information is saved on a Mongo database. The item index is the principal collection, associated with all other collections: culture, media, subjects, and references. Mongoose queries are used to create, read, or update an entry's content.</p>
				<p>Invented by Facebook, the React program modifies content on a single-page application. The NACD displays materials according to changes in the application's &quot;state,&quot; controlled by visitor navigation. React's componential structure allows display elements to be written separately and coordinated via the transfer of information &quot;properties.&quot;</p>
				<p>To begin populating the database, Edgar wrote APIs to access JSON content made available by the <a href="https://www.rrncommunity.org" target="_blank">Reciprocal Research Network</a>.</p>
				<p>Edgar controlled and updated versions through GitHub. This current version is live through Heroku hosting and deployment.</p>
				<a id="dedication"></a>
				<h4>Dedication</h4>
				<p>By Edgar Martin del Campo</p>
				<h5>T&iacute;o Juanito</h5>
				<p>My uncle Juan Carlos Espinoza was like a father to me for much of my childhood. During my graduate studies in Claremont, California, I often visited his family in San Bernardino, where he would show me his university's anthropology books, tell me of his father's shamanic ceremonies, and offer me a tape of Yaqui songs. At a time when my interests in indigenous Mexico concentrated on the ancient civilizations, T&iacute;o Juanito introduced me to glimpses of its present faces - which first challenged me to approach the Native cultures of old by understanding those of the new.</p>
				<p>T&iacute;o Juanito was lost during the San Bernardino shooting on December 2, 2015. His surviving relatives received a visit from President Obama, disclosing how he had given his life to save others during the tragic event, and so he would receive full honors for his funeral service. During the burial I gave a brief eulogy by which I recognized his print upon my life's work - and that I would dedicate the next year to researching Cora culture, to discern its role in our family heritage. This database is a realization of that pledge. (Indeed, I would enter notes on the Cora of Nayarit for its first articles!)</p>
				<h5>Don Juanito</h5>
				<p>I met Juan Cabrera Mendoza in 2003, during my first visit to Aztec villages in Veracruz. Known there as &quot;Juanito,&quot; the old shaman hailed from the Sierra Otom&iacute; peoples of the south. During my first experience in an indigenous community, Juanito performed a protection rite for me and sparked my early interest in the communication between the local Aztec and Otom&iacute; cultures, a topic that would eventually shift my research toward Otom&iacute; religion.</p>
				<p>Throughout my Veracruz fieldwork I remember many vivid conversations with the old man on his worldview, an indigenous philosophy that attended to the living forces in the nature and spirit worlds. Most importantly, through his practices and comments came a tradition firmly rooted in Pre-Columbian spirituality, a point that don Juanito himself acknowledged. He consciously tied his work with the ancient Aztecs' - which first challenged me to approach the Native cultures of the new by understanding the weight of the old upon it.</p>
				<p>I present this database project to honor and commemorate the two Juanitos who have inspired me to look to the nations of past and present, in order to elucidate the common wisdoms and spirit that now carry the Native Americas into the future. <em>Axu!</em></p>
				<div className="col-xs-12 col-sm-6"><img className="img-responsive" src="assets/images/tio_juanito.jpg" alt="Juan Carlos Espinoza"/></div>
				<div className="col-xs-12 col-sm-6"><img className="img-responsive" src="assets/images/don_juanito.jpg" alt="Juan Cabrera Mendoza"/></div>
			</div>
		)
	}
}