// Entrypoint of whole application.

// Web use React :)
import React from "react";
import ReactDOM from "react-dom";

// We also use Bootstrap (https://getbootstrap.com/)
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// Here we import main App component...
import App from "./components/layout/App/App";


// ...and here we render it into <div id="root"> element.
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
