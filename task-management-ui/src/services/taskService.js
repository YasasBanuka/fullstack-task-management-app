import axios from "axios";

const API_BASE_URL ='http://localhost:8080/api/tasks'; // Backend URL

// Function to get all tasks
export const getAllTasks = () => {
    return axios.get(API_BASE_URL);
}

// Function to create a new task
export const createTask = (taskData) => {
    return axios.post(API_BASE_URL, taskData);
}

// Function to delete a task by id
export const deleteTask = (taskId) => {
    return axios.delete(`${API_BASE_URL}/${taskId}`);
}

// Function to update a task by id
export const updateTask = (taskId, taskData) => {
    return axios.put(`${API_BASE_URL}/${taskId}`, taskData);
}