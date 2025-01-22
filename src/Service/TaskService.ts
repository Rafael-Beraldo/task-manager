import { tasks } from "../utils/mockDatabase";
import { Task } from "../models/Task";

export class TaskService {
  getAllTasks(): Task[] {
    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
  }

  createTask(newTask: Task): Task {
    tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updatedTask: Partial<Task>): Task | null {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return null;

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    return tasks[taskIndex];
  }

  deleteTask(id: string): boolean {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return false;

    tasks.splice(taskIndex, 1);
    return true;
  }
}
