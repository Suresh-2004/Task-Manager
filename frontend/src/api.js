import axios from "axios";

// my local spring boot backend url
const API = axios.create({
    baseURL: "http://localhost:8080"
});

// interceptor to attach the jwt token to requests so we dont get 403 forbidden errors
API.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;

});

// auth calls

export function registerUser(user) {
    return API.post("/api/auth/register", user);
}

export function loginUser(user) {
    return API.post("/api/auth/login", user);
}

// task methods

// create
export function createTask(task) {
    return API.post("/api/tasks", task);
}

// get all
export function getAllTasks() {
    return API.get("/api/tasks");
}

export function getTaskById(id) {
    return API.get("/api/tasks/" + id);
}

export function updateTask(id, task) {
    return API.put("/api/tasks/" + id, task);
}

export function deleteTask(id) {
    return API.delete("/api/tasks/" + id);
}

export function completeTask(id) {
    return API.put("/api/tasks/" + id + "/complete");
}

// filters and search

export function searchTask(title) {
    return API.get("/api/tasks/search?title=" + title);
}

export function statusTask(status) {
    return API.get("/api/tasks/status?status=" + status);
}

export function priorityTask(priority) {
    return API.get("/api/tasks/priority?priority=" + priority);
}

// sort by date
export function sortTask() {
    return API.get("/api/tasks/sort");
}

// dashboard stats
export function dashboardData() {
    return API.get("/api/tasks/dashboard");
}