import React, { useState, useEffect } from 'react';
import api from '../api/objects';
import { v4 as uuid } from 'uuid';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    //RetrieveTodos
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

    const addTodo = (e) => {
        e.preventDefault();
        addTodoHandler({ name: name, status: status });
        setName('');
        setStatus('');
    };

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
                    className="edit icon blue outline"
                    onClick={() => alert("no :(")}></i>
                <i 
                    className="trash icon red alternate outline" 
                    onClick={() => removeTodoHandler(todo.id) }></i>
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
                            className="field" 
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <input 
                            type="text" 
                            className="field" 
                            placeholder="Status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} />
                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default Todo;
