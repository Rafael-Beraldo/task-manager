import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { Task } from "../models/Task";

const userService = new UserService();

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("ERROR [getAllUsers] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: "An unexpected error occured." });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("ERROR [getUserById] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static createUser(req: Request, res: Response) {
    try {
      const { email, name, lastname, age } = req.body;

      if (!email || !name || !lastname || !age) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const newUser = userService.createUser({
        id: String(new Date().getTime() * 2),
        email,
        name,
        lastname,
        age,
        tasks: [],
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
    }
  }

  static async addTaskToUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { id, title, description, completed } = req.body;

      if (!id || !title || !description || completed === undefined) {
        res.status(400).json({ message: "Missing required fields." });
      }

      const task: Task = { id, title, description, completed, userId };
      const updatedUser = userService.addTaskToUser(userId, task);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("ERROR [addTaskToUser] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedUser = userService.updateUser(id, updatedData);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("ERROR [updateUser] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }

  static deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = userService.deleteUser(id);

      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }

      res.status(200).send();
    } catch (error) {
      console.error("ERROR [deleteUser] > ", error);
      res.status(500).json({ message: "An unexpected error occured." });
    }
  }
}
