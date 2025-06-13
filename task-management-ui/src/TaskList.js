import TaskItem from "./TaskItem";

function TaskList({tasks, onTaskDelete, onTaskEdit}) {
    return(
        <ul>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onTaskDelete={onTaskDelete}
                    onTaskEdit = {onTaskEdit}
                />
            ))}
        </ul>
    );
}

export default TaskList;