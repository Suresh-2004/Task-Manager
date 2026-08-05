package com.taskManager.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.taskManager.backend.entity.Task;
import com.taskManager.backend.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create Task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // View All Tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // View One Task
    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // Update Task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                           @RequestBody Task task) {

        return taskService.updateTask(id, task);
    }

    // Delete Task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        return taskService.deleteTask(id);
    }

    // Mark Task as Completed
    @PutMapping("/{id}/complete")
    public Task completeTask(@PathVariable Long id) {
        return taskService.markCompleted(id);
    }

    // Search by Title
    @GetMapping("/search")
    public List<Task> searchTask(@RequestParam String title) {
        return taskService.searchByTitle(title);
    }

    // Filter by Status
    @GetMapping("/status")
    public List<Task> filterStatus(@RequestParam String status) {
        return taskService.filterByStatus(status);
    }

    // Filter by Priority
    @GetMapping("/priority")
    public List<Task> filterPriority(@RequestParam String priority) {
        return taskService.filterByPriority(priority);
    }

    // Sort by Due Date
    @GetMapping("/sort")
    public List<Task> sortTasks() {
        return taskService.sortByDueDate();
    }

    // Dashboard
    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalTasks", taskService.getTotalTasks());
        dashboard.put("pendingTasks", taskService.getPendingTasks());
        dashboard.put("completedTasks", taskService.getCompletedTasks());
        dashboard.put("overdueTasks", taskService.getOverdueTasks());

        return dashboard;
    }

}