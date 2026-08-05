import { useEffect, useState } from "react";

import { dashboardData } from "../api";

import TaskList from "./TaskList";

function Dashboard() {

    // state to hold the dashboard numbers
    const [dashboard, setDashboard] = useState({

        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        overdueTasks: 0

    });

    // function to get data from backend
    function loadDashboard() {

        dashboardData()

            .then(function (response) {

                setDashboard(response.data);

            })

            .catch(function () {

                alert("Unable to Load Dashboard");

            });

    }

    // load data when the page opens
    useEffect(function () {

        loadDashboard();

    }, []);

    return (

        <div>

            {/* dashboard summary section */}

            <div className="dashboardCard">

                <h2>Dashboard Summary</h2>

                <div className="dashboardGrid">

                    <div className="dashboardBox">

                        <h3>Total Tasks</h3>

                        <p>{dashboard.totalTasks}</p>

                    </div>

                    <div className="dashboardBox">

                        <h3>Pending</h3>

                        <p>{dashboard.pendingTasks}</p>

                    </div>

                    <div className="dashboardBox">

                        <h3>Completed</h3>

                        <p>{dashboard.completedTasks}</p>

                    </div>

                    <div className="dashboardBox">

                        <h3>Overdue</h3>

                        <p>{dashboard.overdueTasks}</p>

                    </div>

                </div>

                <br />

            </div>

            <br />

            {/* shows the table with tasks below */}

            <TaskList
                refreshDashboard={loadDashboard}
            />

        </div>

    );

}

export default Dashboard;