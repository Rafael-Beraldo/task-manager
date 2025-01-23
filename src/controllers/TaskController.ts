import { Request, Response } from "express";
import { TaskService } from "../service/TaskService";

const taskService = new TaskService();

export class TaskController {
  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("ERROR [getAllTasks] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = taskService.getTaskById(id);

      if (!task) {
        res.status(404).json({ message: "Task not found!" });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("ERROR [getTaskById] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { title, description, completed, userId } = req.body;

      if (!title || !description || completed === undefined || !userId) {
        res.status(400).json({ message: "Missing required fields." });
      }

      const newTask = taskService.createTask({
        id: String(new Date().getTime()), // Simulação de ID
        title,
        description,
        completed,
        userId,
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.error("ERROR [createTask] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedTask = req.body;

      const task = taskService.updateTask(id, updatedTask);

      if (!task) {
        res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("ERROR [updateTask] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = taskService.deleteTask(id);

      if (!success) {
        res.status(404).json({ message: "Task not found" });
      }
      res.status(204).send("Succes");
    } catch (error) {
      console.error("ERROR [deleteTask] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }
}
