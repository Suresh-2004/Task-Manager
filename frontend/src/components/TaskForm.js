// importing stuff we need
import { useState } from "react";
import { createTask } from "../api";

// the task form component
function TaskForm({
                      loadTasks,
                      loadDashboard,
                      backToDashboard
                  }) {

    // set up all the state variables for the inputs
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("HIGH");
    const [status, setStatus] = useState("PENDING");
    const [dueDate, setDueDate] = useState("");

    // for success or error message
    const [message, setMessage] = useState("");

    // function to handle the form submit
    function handleSubmit(event) {

        // stop default form submit behavior so page doesn't reload
        event.preventDefault();

        // create the object to send
        const task = {

            title: title,
            description: description,
            priority: priority,
            status: status,
            dueDate: dueDate

        };

        // calling backend api
        createTask(task)

            .then(function () {

                setMessage("Task Created Successfully");

                // reset form fields
                setTitle("");
                setDescription("");
                setPriority("HIGH");
                setStatus("PENDING");
                setDueDate("");

                // reload stuff if the props were passed
                if (loadTasks) {
                    loadTasks();
                }

                if (loadDashboard) {
                    loadDashboard();
                }

                // go back to dashboard after a short delay so user sees message
                if (backToDashboard) {

                    setTimeout(function () {

                        backToDashboard();

                    }, 700);

                }

            })

            .catch(function (error) {

                // print errors to console to debug
                console.log("========== CREATE TASK ERROR ==========");
                console.log(error);

                if (error.response) {

                    console.log("Status :", error.response.status);
                    console.log("Data :", error.response.data);

                }

                setMessage("Unable to Create Task");

            });

    }

    // render the html
    return (

        <div className="card">

            <h2>Create Task</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />

                <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                ></textarea>

                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    required
                />

                <div className="taskFormButtons">

                    <button type="submit">
                        Create Task
                    </button>

                    {

                        // show back button only if we have the prop for it
                        backToDashboard && (

                            <button
                                type="button"
                                onClick={backToDashboard}
                            >
                                Back
                            </button>

                        )

                    }

                </div>

            </form>

            {

                message &&

                <p className="successMessage">

                    {message}

                </p>

            }

        </div>

    );

}

export default TaskForm;