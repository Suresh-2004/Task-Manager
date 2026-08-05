import { useState } from "react";

import "./app.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";

function App() {

    // state for checking if user is logged in
    const [loggedIn, setLoggedIn] = useState(false);

    // true means show login, false means show register
    const [showLogin, setShowLogin] = useState(true);

    // controls create task page
    const [showCreateTask, setShowCreateTask] = useState(false);

    // logout function
    function logout() {

        localStorage.removeItem("token");

        setLoggedIn(false);

        setShowCreateTask(false);

    }

    return (

        <div className="container">

            <h1>Task Manager</h1>

            {/* Login / Register */}

            {

                !loggedIn && (

                    <div>

                        <div className="menu">

                            <button
                                onClick={() => setShowLogin(true)}
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setShowLogin(false)}
                            >
                                Register
                            </button>

                        </div>

                        {

                            showLogin ?

                                <Login
                                    setLoggedIn={setLoggedIn}
                                />

                                :

                                <Register />

                        }

                    </div>

                )

            }

            {/* Logged In */}

            {

                loggedIn && (

                    <div>

                        {/* Dashboard Header */}

                        {

                            !showCreateTask && (

                                <div className="topBar">

                                    <h2>Dashboard</h2>

                                    <div className="topButtons">

                                        <button

                                            className="addButton"

                                            onClick={() =>
                                                setShowCreateTask(true)
                                            }

                                        >

                                            + Add Task

                                        </button>

                                        <button
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>

                                    </div>

                                </div>

                            )

                        }

                        {/* Create Task Header */}

                        {

                            showCreateTask && (

                                <div className="topBar">

                                    <h2>Create Task</h2>

                                </div>

                            )

                        }

                        {

                            showCreateTask ?

                                <TaskForm

                                    backToDashboard={() =>
                                        setShowCreateTask(false)
                                    }

                                />

                                :

                                <Dashboard />

                        }

                    </div>

                )

            }

        </div>

    );

}

export default App;