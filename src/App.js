import logo from './logo.svg';
import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { Footer } from './MyComponents/Footer';
import { AddTodo } from './MyComponents/AddTodo';
import { About } from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    let initTodo
    if (localStorage.getItem("todos") === null) {
        initTodo = []
    }
    else {
        initTodo = JSON.parse(localStorage.getItem("todos"))
    }
    const onDelete = (todo) => {
        console.log("I am onDelete of todo", todo)
        // traditional method which will not work
        // Deleting this way in react doesn't work
        // let index = todos.indexOf(todo)
        // todos.splice(index, 1)

        setTodos(todos.filter((e) => {
            return e !== todo
        }))
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const addTodo = (title, desc) => {
        console.log("I am adding this Todo", title, desc)
        let sno
        if (todos.length === 0) {
            sno = 1
        }
        else {
            sno = todos[todos.length - 1].sno + 1
        }
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc
        }
        setTodos([...todos, myTodo])
        console.log(myTodo)
    }
    // using react state hooks
    // setTodos is a function
    const [todos, setTodos] = useState(initTodo)
    // using useEffect hooks to make sure updating is smoothly done
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    return (
        <>
            <Router>
                <Header title="MyTodosList" searchBar={true} />
                <Switch>
                    {/* exact will help route properly as it reads from the starting / */}
                    <Route exact path="/" render={() => {
                        return (
                            <>
                                <AddTodo addTodo={addTodo} />
                                <Todos todos={todos} onDelete={onDelete} />
                            </>
                        )
                    }}>
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                </Switch>

                <Footer />
            </Router>
        </>
    );
}

export default App;
