import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {ButtonFilteredValue, TaskType} from "../App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilterButton: (buttonName: ButtonFilteredValue) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (id:string, isDone:boolean)=>void
    filter: ButtonFilteredValue
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
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => {
        props.changeFilterButton('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilterButton('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilterButton('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                        props.removeTask(el.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
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
                <button className={props.filter === 'all' ? 'active-filter': ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter': ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
