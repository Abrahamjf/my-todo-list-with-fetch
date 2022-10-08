import React, {useState} from "react";
import {Title} from "./Title.js";
import {Input} from "./Input.js";



//create your first component
export const Home = () => {
	const [task, setTask] = useState("")
	const [listOfTasks, setlistOfTasks] = useState([])
	let handlerKey = (evento) => {
		if(evento.key == "Enter" && task != ""){
			setlistOfTasks([...listOfTasks, task])
			setTask("")
		};
	};



	return (
		<React.Fragment>
			<Title />
			<div className="box d-flex flex-column">
            	<input onChange={evento => setTask(evento.target.value)} onKeyDown={handlerKey} value={task} className="tasks"placeholder="What needs to be done?"></input>
				{listOfTasks && listOfTasks.map((task,index)=> <div key={index}>{task}</div>)}
				{listOfTasks && listOfTasks.length == 0 && <h2>No tasks, add a task.</h2>}

        	</div>
		</React.Fragment>
	);
};

