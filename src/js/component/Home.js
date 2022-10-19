import React, { useState, useEffect } from "react";
import { Title } from "./Title.js";
import { Input } from "./Input.js";


let urlBase = "https://assets.breatheco.de/apis/fake/todos/user/abrahamjf"

//create your first component
export const Home = () => {
  const [listOfTasks, setlistOfTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  let handlerKey = (event) => {
    if (event.key == "Enter" && event.target.value != "") {
      //setlistOfTasks([...listOfTasks, task]);
      //editListOfTask(listOfTasks)
      // setTask("");
      let newTask = [...listOfTasks,{ label:event.target.value, done: false}]
      editListOfTask(newTask)
      setInputValue("")
    }
  };

  let handleChange = (event) => {
	//setTask({...task,[event.target.name]:event.target.value})
  setInputValue(event.target.value)
  }

  let getTask = async() => {
	try{
		let response = await fetch(urlBase)
		if (response.ok) {
      let data = await response.json()
			setlistOfTasks(data)
		} else if (response.status === 404){
        createUser()
		}
	}catch(error){console.log(error)}
  }

  const createUser = async () => {
        const response = await fetch(urlBase,
              {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify([])
              }
            );
        if(response.ok) {
          const body = await response.json();
          getTask();  
        } else if (response.status === 400) {
            getTask()
        }
  };

  const editListOfTask = async (newList) => {
    const response = await fetch(urlBase,
      {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newList)
      }
    );
    if (response.ok) {
      getTask()
    }
  };

  const deleteListOfTask = async (position) => {
    
      let result = listOfTasks.filter((element, id) => {
        return position !== id;
      })
    
    const response = await fetch(urlBase,
      {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(result)
      }
    );
    if (response.ok) {
        getTask()
    }
    //setlistOfTasks();
  };



  useEffect(()=>{createUser()},[])
  return (
    <React.Fragment>
      <Title />
      <div className="box d-flex flex-column">
        <input
          onChange={handleChange}
          onKeyDown={handlerKey}
          value={inputValue}
		  name="label"
          className="tasks"
          placeholder="What needs to be done?"
        ></input>
        {listOfTasks &&
          listOfTasks.map((task, index) => (
            <span key={index} className="alltask">
              {task.label}
              <button
                onClick={event=>{
                  
                  deleteListOfTask(index)
                }}
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
