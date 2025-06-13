package com.webdynamo.task_management.controller;

import com.webdynamo.task_management.entity.Task;
import com.webdynamo.task_management.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

//    Create a Task (HTTP POST)
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

//    Get All Tasks (HTTP GET)
    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

//    Get a Single Task by ID (HTTP GET)
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id)
                .map(task -> ResponseEntity.ok(task))
                .orElse(ResponseEntity.notFound().build());
    }

//    Update Task by ID (HTTP PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){
        try{
            Task updatedTask = taskService.updateTask(id, taskDetails);
            return ResponseEntity.ok(updatedTask); // Return 200 OK with the updated task
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // If the task to update isn't found
        }
    }

//    Delete Task by ID (HTTP DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        try{
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build(); // Return 204 No Content, the standard for successful deletes
        }catch(Exception e){
            return ResponseEntity.notFound().build(); // Return 404 Not Found, the standard for unsuccessful deletes
        }
    }
}
