import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ButtonFilteredValue = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "SQL", isDone: true}
        ]
    )

    let [filter, setFilter] = useState<ButtonFilteredValue>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilterButton = (buttonName: ButtonFilteredValue) => {
        setFilter(buttonName)
    }

    const addTask = (taskTitle:string) => {
        let task =  {id: v1(), title: taskTitle, isDone: false};
        setTasks([task, ...tasks])
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeTaskStatus = (id:string, isDone:boolean) => {
            setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone}: el))
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilterButton={changeFilterButton}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
