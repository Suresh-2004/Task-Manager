package com.taskManager.backend.service;

import com.taskManager.backend.entity.Task;
import com.taskManager.backend.exception.ResourceNotFoundException;
import com.taskManager.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create Task
    public Task createTask(Task task) {

        task.setCreatedDate(LocalDate.now());

        // Default Status
        if (task.getStatus() == null || task.getStatus().isEmpty()) {

            task.setStatus("PENDING");

        }

        return taskRepository.save(task);

    }

    // View All Tasks
    public List<Task> getAllTasks() {

        return taskRepository.findAll();

    }

    // View One Task
    public Task getTaskById(Long id) {

        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task Not Found"));

    }

    // Update Task
    public Task updateTask(Long id, Task updatedTask) {

        Task task = getTaskById(id);

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setStatus(updatedTask.getStatus());
        task.setDueDate(updatedTask.getDueDate());

        return taskRepository.save(task);

    }

    // Delete Task
    public String deleteTask(Long id) {

        Task task = getTaskById(id);

        taskRepository.delete(task);

        return "Task Deleted Successfully";

    }

    // Mark Completed
    public Task markCompleted(Long id) {

        Task task = getTaskById(id);

        task.setStatus("COMPLETED");

        return taskRepository.save(task);

    }

    // Search by Title
    public List<Task> searchByTitle(String title) {

        return taskRepository.findByTitleContaining(title);

    }

    // Filter by Status
    public List<Task> filterByStatus(String status) {

        return taskRepository.findByStatus(status);

    }

    // Filter by Priority
    public List<Task> filterByPriority(String priority) {

        return taskRepository.findByPriority(priority);

    }

    // Sort by Due Date
    public List<Task> sortByDueDate() {

        List<Task> tasks = taskRepository.findAll();

        tasks.sort(Comparator.comparing(Task::getDueDate));

        return tasks;

    }

    // Dashboard - Total Tasks
    public long getTotalTasks() {

        return taskRepository.count();

    }

    // Dashboard - Pending Tasks
    public long getPendingTasks() {

        return taskRepository.findByStatus("PENDING").size();

    }

    // Dashboard - Completed Tasks
    public long getCompletedTasks() {

        return taskRepository.findByStatus("COMPLETED").size();

    }

    // Dashboard - Overdue Tasks
    public long getOverdueTasks() {

        LocalDate today = LocalDate.now();

        return taskRepository.findAll()
                .stream()
                .filter(task ->

                        task.getDueDate() != null
                                && task.getDueDate().isBefore(today)
                                && !"COMPLETED".equals(task.getStatus())

                )
                .count();

    }

}