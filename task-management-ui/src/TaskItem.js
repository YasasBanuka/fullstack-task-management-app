function TaskItem({task, onTaskEdit, onTaskDelete}){
    return(
        <li>
            <span>
                <strong> {task.title} </strong> - <i> {task.description || 'No Description'} </i>
            </span>

            <div>
                <button className="edit" onClick={() => onTaskEdit(task)}> Edit </button>
                <button className="delete" onClick={() => onTaskDelete(task.id)}> Delete </button>
            </div>
        </li>
    );
}

export default TaskItem;