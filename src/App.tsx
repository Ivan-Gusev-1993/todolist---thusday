import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

type TasksType = {
   [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: ButtonFilteredValue
}

export type ButtonFilteredValue = 'all' | 'active' | 'completed'

export function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const changeFilterButton = (todolistID: string, buttonName: ButtonFilteredValue) => {
        setTodolists(todolists.map(td => td.id === todolistID  ? {...td, filter: buttonName} : td))
    }

    const addTask = (todolistID: string, taskTitle: string) => {
        let todolistTasks = tasks[todolistID]
        let task = {id: v1(), title: taskTitle, isDone: false};
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks( {...tasks})
    }

    const removeTask = (id: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
      tasks[todolistID] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string,  todolistID: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistID]
       tasks[todolistID] = todolistTasks.map(el => el.id === id ? {...el, isDone: isDone} : el)
        setTasks({...tasks})
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tdl => tdl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">

            {todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks;

                    if (todolist.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone )
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                    }

                    return <Todolist key={todolist.id}
                                     todolistID={todolist.id}
                                     title={todolist.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilterButton={changeFilterButton}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolist.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}


