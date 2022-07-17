import React from "react";
import {Title} from "./Title.js";
import {Input} from "./Input.js";


//create your first component
export const Home = () => {
	return (
		<React.Fragment>
			<Title />
			<Input />
		</React.Fragment>
	);
};

