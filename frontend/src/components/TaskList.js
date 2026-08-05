import { useEffect, useState } from "react";

import {
    getAllTasks,
    deleteTask,
    completeTask,
    updateTask,
    searchTask,
    priorityTask,
    statusTask,
    sortTask
} from "../api";

function TaskList({ refreshDashboard }) {

    const [tasks, setTasks] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");

    const [status, setStatus] = useState("");

    const [priority, setPriority] = useState("");

    // sort order state
    const [sortOrder, setSortOrder] = useState("oldest");

    const [editId, setEditId] = useState(null);

    const [editTask, setEditTask] = useState({

        title: "",
        description: "",
        priority: "HIGH",
        status: "PENDING",
        dueDate: ""

    });

    useEffect(function () {

        loadTasks();

    }, []);

    // load tasks from backend
    function loadTasks() {

        getAllTasks()

            .then(function (response) {

                let taskData = response.data;

                // reverse if newest is picked
                if (sortOrder === "newest") {

                    taskData = [...taskData].reverse();

                }

                setTasks(taskData);

            })

            .catch(function () {

                alert("Unable to Load Tasks");

            });

    }

    // delete
    function removeTask(id) {

        if (!window.confirm("Delete this task?")) {

            return;

        }

        deleteTask(id)

            .then(function () {

                loadTasks();

                refreshDashboard();

            })

            .catch(function () {

                alert("Delete Failed");

            });

    }

    // mark as completed
    function markCompleted(id) {

        completeTask(id)

            .then(function () {

                loadTasks();

                refreshDashboard();

            })

            .catch(function () {

                alert("Unable to Complete Task");

            });

    }

    // search
    function search() {

        if (searchTitle.trim() === "") {

            loadTasks();

            return;

        }

        searchTask(searchTitle)

            .then(function (response) {

                setTasks(response.data);

            })

            .catch(function () {

                alert("Search Failed");

            });

    }

    // start editing
    function startEdit(task) {

        setEditId(task.id);

        setEditTask({

            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate

        });

    }

    // save the edit
    function saveEdit(id) {

        updateTask(id, editTask)

            .then(function () {

                setEditId(null);

                loadTasks();

                refreshDashboard();

            })

            .catch(function () {

                alert("Update Failed");

            });

    }

    return (

        <div>

            <h2>Task List</h2>

            {/* filters */}
            <div className="filterPanel">

                <div className="filterGrid">

                    <div className="filterItem">

                        <label>Search Title</label>

                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchTitle}
                            onChange={(event) => {

                                const value = event.target.value;

                                setSearchTitle(value);

                                if (value.trim() === "") {

                                    loadTasks();

                                    return;

                                }

                                searchTask(value)

                                    .then(function (response) {

                                        setTasks(response.data);

                                    })

                                    .catch(function () {

                                        alert("Search Failed");

                                    });

                            }}
                        />

                    </div>

                    <div className="filterItem">

                        <label>Status</label>

                        <select
                            value={status}
                            onChange={(e) => {

                                const value = e.target.value;

                                setStatus(value);

                                if (value === "") {

                                    loadTasks();

                                    return;
                                }

                                statusTask(value)
                                    .then((response) => {

                                        setTasks(response.data);

                                    })
                                    .catch(() => {

                                        alert("Unable to filter status");

                                    });

                            }}
                        >

                            <option value="">All Status</option>

                            <option value="PENDING">Pending</option>

                            <option value="COMPLETED">Completed</option>

                        </select>

                    </div>

                    <div className="filterItem">

                        <label>Priority</label>

                        <select
                            value={priority}
                            onChange={(e) => {

                                const value = e.target.value;

                                setPriority(value);

                                if (value === "") {

                                    loadTasks();

                                    return;
                                }

                                priorityTask(value)
                                    .then((response) => {

                                        setTasks(response.data);

                                    })
                                    .catch(() => {

                                        alert("Unable to filter priority");

                                    });

                            }}
                        >

                            <option value="">All Priority</option>

                            <option value="HIGH">High</option>

                            <option value="MEDIUM">Medium</option>

                            <option value="LOW">Low</option>

                        </select>

                    </div>

                    <div className="filterItem">

                        <label>Sort Due Date</label>

                        <select
                            value={sortOrder}
                            onChange={(e) => {

                                const value = e.target.value;

                                setSortOrder(value);

                                sortTask()
                                    .then((response) => {

                                        let data = response.data;

                                        if (value === "newest") {
                                            data.reverse();
                                        }

                                        setTasks(data);

                                    })
                                    .catch(() => {

                                        alert("Unable to sort tasks");

                                    });

                            }}
                        >

                            <option value="oldest">

                                Oldest First

                            </option>

                            <option value="newest">

                                Newest First

                            </option>

                        </select>

                    </div>

                </div>

                <button

                    className="actionButton"

                    onClick={loadTasks}

                >

                    View All

                </button>

            </div>

            <br />
            <table className="taskTable">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Title</th>

                    <th>Description</th>

                    <th>Priority</th>

                    <th>Status</th>

                    <th>Due Date</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    tasks.map(function (task) {

                        return (

                            <tr key={task.id}>

                                <td>{task.id}</td>

                                {/* title */}

                                <td>

                                    {

                                        editId === task.id ?

                                            <input
                                                value={editTask.title}
                                                onChange={(event) =>

                                                    setEditTask({

                                                        ...editTask,
                                                        title: event.target.value

                                                    })

                                                }
                                            />

                                            :

                                            task.title

                                    }

                                </td>

                                {/* description */}

                                <td>

                                    {

                                        editId === task.id ?

                                            <input
                                                value={editTask.description}
                                                onChange={(event) =>

                                                    setEditTask({

                                                        ...editTask,
                                                        description: event.target.value

                                                    })

                                                }
                                            />

                                            :

                                            task.description

                                    }

                                </td>

                                {/* priority */}

                                <td>

                                    {

                                        editId === task.id ?

                                            <select

                                                value={editTask.priority}

                                                onChange={(event) =>

                                                    setEditTask({

                                                        ...editTask,
                                                        priority: event.target.value

                                                    })

                                                }

                                            >

                                                <option value="HIGH">HIGH</option>
                                                <option value="MEDIUM">MEDIUM</option>
                                                <option value="LOW">LOW</option>

                                            </select>

                                            :

                                            task.priority

                                    }

                                </td>

                                {/* status */}

                                <td>

                                    {

                                        editId === task.id ?

                                            <select

                                                value={editTask.status}

                                                onChange={(event) =>

                                                    setEditTask({

                                                        ...editTask,
                                                        status: event.target.value

                                                    })

                                                }

                                            >

                                                <option value="PENDING">PENDING</option>

                                                <option value="COMPLETED">COMPLETED</option>

                                            </select>

                                            :

                                            task.status

                                    }

                                </td>

                                {/* due date */}

                                <td>

                                    {

                                        editId === task.id ?

                                            <input

                                                type="date"

                                                value={editTask.dueDate}

                                                onChange={(event) =>

                                                    setEditTask({

                                                        ...editTask,
                                                        dueDate: event.target.value

                                                    })

                                                }

                                            />

                                            :

                                            task.dueDate

                                    }

                                </td>

                                {/* action buttons */}

                                <td>

                                    <div className="actionButtons">

                                        {

                                            editId === task.id ?

                                                <button

                                                    className="saveButton"

                                                    onClick={() => saveEdit(task.id)}

                                                >

                                                    Save

                                                </button>

                                                :

                                                <button

                                                    className="editButton"

                                                    onClick={() => startEdit(task)}

                                                >

                                                    Edit

                                                </button>

                                        }

                                        <button

                                            className="deleteButton"

                                            onClick={() => removeTask(task.id)}

                                        >

                                            Delete

                                        </button>

                                        {

                                            task.status !== "COMPLETED" && (

                                                <button

                                                    className="completeButton"

                                                    onClick={() => markCompleted(task.id)}

                                                >

                                                    Complete

                                                </button>

                                            )

                                        }

                                    </div>

                                </td>

                            </tr>

                        );

                    })

                }

                </tbody>

            </table>

        </div>

    );

}

export default TaskList;