import {useEffect, useState} from "react";

function TaskForm({onTaskCreate,  onTaskUpdate, taskToEdit, onCancelEdit}) {

    // State to hold the value of the input field
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        // Prevent the default form submission which reloads the page
        e.preventDefault();

        // Validation to ensure the title isn't empty
        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        // Call the function passed from the App component
        onTaskCreate({title: title, description: 'Start the controller step', dueDate: '2025-06-15', status: 'COMPLETED'});

        // Clear the input field after submission
        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        onCancelEdit();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* The title input is always visible but triggers expansion */}
                <input
                    type="text"
                    placeholder="Take a note..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit"> Add Task </button>
            </form>
        </div>
    );
}

export default TaskForm;