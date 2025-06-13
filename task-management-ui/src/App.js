import './App.css';
import {useEffect, useState} from "react";
import * as taskService from "./services/taskService";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {

    // State to hold the list of tasks
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    // useEffect to fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []); // The empty array [] means this effect runs only once

    // Define an async function inside useEffect
    const fetchTasks = async () => {
        try {
            const response = await taskService.getAllTasks();
            setTasks(response.data); // Update the state with the fetched tasks
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Handler function to create a new task
    const handleCreateTask = async (taskData) => {
        try {
            await taskService.createTask(taskData);
            // After creating, fetch the updated list of all tasks
            fetchTasks();
        }catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error(`Error deleting task ${taskId}:`, error);
        }
    };

    const handleEditClick = (task) => {
        console.log("Editing task:", task);
        setCurrentTask(task);
    }

    return (
        <div className="App">
            <h1> Task Management App </h1>

            <TaskForm onTaskCreate={handleCreateTask} />

            <hr/>

            <h2> Tasks </h2>
            <TaskList
                tasks={tasks}
                onTaskDelete={handleDeleteTask}
                onTaskEdit = {handleEditClick}
            />
        </div>
    );
}

export default App;
