function TaskItem({task, onTaskEdit, onTaskDelete}){
    return(
        <li>
            <span>
                <strong> {task.title} </strong> - <i> {task.description || 'No Description'} </i>
            </span>
            <span>
                <strong> {task.status || 'No Status'}  </strong>
                <i> {task.dueDate || 'No Status'}  </i>
            </span>

            <div>
                <button onClick={() => onTaskEdit(task)}> Edit </button>
                <button onClick={() => onTaskDelete(task.id)}> Delete </button>
            </div>
        </li>
    );
}

export default TaskItem;