import React, { useState, useEffect } from "react";
import { Title } from "./Title.js";
import { Input } from "./Input.js";

let initialState = {
  label: "",
  done: false,
};

let urlBase = "https://assets.breatheco.de/apis/fake/todos/user/abrahamjf"

//create your first component
export const Home = () => {
  const [task, setTask] = useState(initialState);
  const [listOfTasks, setlistOfTasks] = useState([]);
  let handlerKey = (event) => {
    if (event.key == "Enter" && task != "") {
      setlistOfTasks([...listOfTasks, task]);
      setTask("");
    }
  };

  let handleChange = (event) => {
	setTask({...task,[event.target.name]:event.target.value})
  }

  let getTask = async() => {
	try{
		let response = await fetch(urlBase)
		let data = await response.json()
		if (response.ok) {
			setlistOfTasks(data)
		} else {
			console.log("Debo crear el usuario")
		}
	}catch(error){console.log(error)}
  }
  useEffect(()=>{getTask()},[])
  return (
    <React.Fragment>
      <Title />
      <div className="box d-flex flex-column">
        <input
          onChange={handleChange}
          onKeyDown={handlerKey}
          value={task.label}
		  name="label"
          className="tasks"
          placeholder="What needs to be done?"
        ></input>
        {listOfTasks &&
          listOfTasks.map((task, index) => (
            <span key={index} className="alltask">
              {task.label}
              <button
                onClick={(event) =>
                  setlistOfTasks(
                    listOfTasks.filter((element, id) => {
                      return index !== id;
                    })
                  )
                }
              >
                X
              </button>
            </span>
          ))}
        {listOfTasks && listOfTasks.length == 0 && (
          <h2 className="list">No tasks, add a task.</h2>
        )}
        {
          <span className="counter d-flex">
            {""}
            {listOfTasks.length === 0
              ? "no task"
              : listOfTasks.length + " item left"}
            {""}
          </span>
        }
      </div>
    </React.Fragment>
  );
};
