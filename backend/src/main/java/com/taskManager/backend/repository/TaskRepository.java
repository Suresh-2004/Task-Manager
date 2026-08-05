package com.taskManager.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskManager.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByTitleContaining(String title);

    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);

}