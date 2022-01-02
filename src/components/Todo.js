import React, { useState, useEffect } from 'react';
import api from '../api/objects';
import { v4 as uuid } from 'uuid';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState("");

    // RetrieveTodos
    const retrieveTodos = async () => {
        const response = await api.get("/todos");
        if (response.data) {
            setTodos(response.data);
        }
    };

    const addTodoHandler = async (todo) => {
        const request = {
            id: uuid(),
            ...todo,
        };
        const response = await api.post("/todos", request);
        setTodos([...todos, response.data]);
    };

    const removeTodoHandler = async (id) => {
        await api.delete(`/todos/${id}`);
        const newTodoList = todos.filter((todo) => {
            return todo.id !== id;
        });

        setTodos(newTodoList);
    };

    const updateTodoHandler = async (todo) => {
        const response = await api.put(`/todos/${todo.id}`, todo);
        const { id } = response.data;
        setTodos(
            todos.map((todo) => {
                return todo.id === id ? { ...response.data } : todo;
            })
        );
    };
    
    /** Adds a new todo, verifying there's valid data. */
    const addTodo = (e) => {
        e.preventDefault();

        /** Removes empty space characters */
        setName(name.trim());
        setStatus(status.trim());
        
        /** Valid lengths for name and status */
        if(name.length < 3 || status.length < 1){
            alert('All fields must have a valid value!');
            clearStateData();
            return;
        }

        addTodoHandler({ name: name, status: status });
        clearStateData();
    };

    /** Simply clears all state values of the component. */
    const clearStateData = () => {
        setName('');
        setStatus('');
    }

    /** Loads all todo items, and returns empty json object if nothing is there. */
    useEffect(() => {
        retrieveTodos();
    }, []);


    const renderTodoList = (todos).map((todo) => {
        return (
            <div className="item">
                <div className="content">
                    <div className="header">{todo.name}</div>
                    <div>{todo.status}</div>
                </div>
                <i 
                    className="icon hand point up outline"
                    onClick={() => alert("change!!!!!!")}
                    title="change status"></i>
                <i 
                    className="trash icon red alternate outline" 
                    onClick={() => removeTodoHandler(todo.id) }
                    title="delete"
                    style={{ margin: "4px" }}></i>
            </div>
        );
    });

    return (
        <div className="ui main">
            <div className="main">
                <h2>Todo List</h2>
                <div className="ui celled list">
                    {renderTodoList}
                </div>
            </div>
            <div className="ui center menu">
                <form 
                    className="ui form"
                    action="/" 
                    onSubmit={addTodo} >
                    <fieldset>
                        <legend>Add Todo</legend>
                        <input 
                            type="text" 
                            className="ui field"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <input 
                            type="text" 
                            className="ui field" 
                            placeholder="Status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} />
                        <button className="ui field button">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default Todo;
