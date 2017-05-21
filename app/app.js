var React = require("react");
var ReactDOM = require("react-dom");
import routes from "./config/routes";

ReactDOM.render(
  <App>
    {routes}
  </App>,
document.getElementById('app'));