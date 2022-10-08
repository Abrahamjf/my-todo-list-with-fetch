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
	// const eraser = (id) => {
	// 	const newListOfTask = listOfTasks.filter((e,index)=> index != id);
	// 	setlistOfTasks(newListOfTask);
	// };

	// let eraseTask = () =>{
	// 	listOfTasks.eraser(task);
	// }
	let eraseTask = () => {
		const newTasks = listOfTasks.filter((task, index) => {
			if (id === index) {
				return false;
			}
			return true;
		})
	};

	const count = {};

	for (task of listOfTasks) {
		if (count [task]) {

		}
	}

	return (
		<React.Fragment>
			<Title />
			<div className="box d-flex flex-column">
            	<input onChange={evento => setTask(evento.target.value)} onKeyDown={handlerKey} value={task} className="tasks"placeholder="What needs to be done?"></input>
				{listOfTasks && listOfTasks.map((task,index)=> <span key={index} classsName="alltask">{task} <button onClick={eraseTask}>X</button></span>)}
				{listOfTasks && listOfTasks.length == 0 && <h2 className="list">No tasks, add a task.</h2>}
				
        	</div>
		</React.Fragment>
	);
};

