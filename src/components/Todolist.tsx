import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {ButtonFilteredValue, TodolistType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilterButton: (todolistID: string, buttonName: ButtonFilteredValue) => void
    addTask: (todolistID: string, taskTitle: string) => void
    changeTaskStatus: (id:string, todolistID: string, isDone:boolean)=>void
    filter: ButtonFilteredValue
    todolistID: string
    removeTodolist: (id: string)=> void
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string|null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (title.trim() !== ''){
            props.addTask(props.todolistID, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => {
        props.changeFilterButton(props.todolistID, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilterButton(props.todolistID,'active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilterButton(props.todolistID,'completed')
    }

    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={onClickRemoveTodolist}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = () => {
                        props.removeTask(el.id, props.todolistID)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, props.todolistID, e.currentTarget.checked)
                    }
                    return(
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                        <span>{el.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>)
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
