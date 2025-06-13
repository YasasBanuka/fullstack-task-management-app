package com.webdynamo.task_management.service;

import com.webdynamo.task_management.entity.Task;
import com.webdynamo.task_management.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

//    Get All Tasks
    public List<Task> getAllTasks() {
        // Simply call the repository's findAll() method
        return taskRepository.findAll();
    }

//    Create a Task
    public Task createTask(Task task) {
        // Add Validation Logic
        return taskRepository.save(task);
    }

//    Get a Single Task (with error handling)
    public Optional<Task> getTaskById(Long id) {
        // findById returns an Optional, which is a modern way to handle
        // cases where the value might be null (i.e., the task is not found).
        return taskRepository.findById(id);
    }

//    Update a Task
    public Task updateTask(Long id, Task taskDetails) {
        // Find the existing task
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found by id: " + id));

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setDueDate(taskDetails.getDueDate());

        return taskRepository.save(existingTask);    }

//    Delete a Task
    public void deleteTask(Long id) {
        // Check if the task exists before deleting
        if (!taskRepository.existsById(id)){
            throw new RuntimeException("Task not found by id: " + id);
        }
        taskRepository.deleteById(id);
        System.out.println("Task deleted");
    }



}
