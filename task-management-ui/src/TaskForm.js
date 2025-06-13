import {useEffect, useState} from "react";

function TaskForm({onTaskCreate,  onTaskUpdate, taskToEdit, onCancelEdit}) {

    // State to hold the value of the input field
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isExpanded, setIsExpanded] = useState(false);

    const isEditMode = taskToEdit !== null;

    useEffect(() => {
        if (isEditMode) {
            setIsExpanded(true);
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit, isEditMode]);

    const handleFocus = () => {
        setIsExpanded(true);
    };


    const handleSubmit = (e) => {
        // Prevent the default form submission which reloads the page
        e.preventDefault();

        // Validation to ensure the title isn't empty
        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        const taskData = {
            title,
            description,

            status: isEditMode ? taskToEdit.status : 'PENDING',
            dueDate: isEditMode ? taskToEdit.dueDate : '2025-06-15'
        };

        if (isEditMode) {
            onTaskUpdate(taskToEdit.id, taskData);
        } else {
            onTaskCreate(taskData);
        }
        // Call the function passed from the App component
        // onTaskCreate({title: title, description: 'Start the controller step', dueDate: '2025-06-15', status: 'COMPLETED'});

        // Clear the input field after submission
        setTitle('');
        setDescription('');
        setIsExpanded(false);
    };

    const handleCancel = () => {
        onCancelEdit();
        setIsExpanded(false);
    };

    return (
        <div className={`task-form-container ${isExpanded ? 'expanded' : ''}`}>
            <form onSubmit={handleSubmit}>
                {/* The title input is always visible but triggers expansion */}
                <input
                    type="text"
                    placeholder="Take a note..."
                    onFocus={handleFocus}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* --- CONDITIONAL RENDERING --- */}
                {/* The description and buttons only appear when expanded */}
                {isExpanded && (
                    <>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                        />
                        <div className="form-actions">
                            <button type="submit">{isEditMode ? 'Update Task' : 'Add Task'}</button>
                            {/* We only need the cancel button in edit mode */}
                            {isEditMode && (
                                <button type="button" onClick={handleCancel}>Cancel</button>
                            )}
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default TaskForm;