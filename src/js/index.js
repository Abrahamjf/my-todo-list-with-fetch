//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import {Home} from "./component/Home.js";
//import {Title} from "./component/Title.js";
//import {Input} from "./component/Input.js";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
