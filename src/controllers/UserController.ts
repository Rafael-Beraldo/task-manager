import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { Task } from "../models/Task";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = new UserService();
const SECRET_KEY = process.env.JWT_SECRET || "raffa";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("ERROR [getAllUsers] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("ERROR [getUserById] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email, password, name, lastname, age } = req.body;

      if (!email || !password || !name || !lastname || !age) {
        res.status(400).json({ message: "Missing required fields." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser({
        id: String(new Date().getTime()),
        email,
        password: hashedPassword,
        name,
        lastname,
        age,
        tasks: [],
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("ERROR [createUser] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async addTaskToUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { id, title, description, completed } = req.body;

      if (!id || !title || !description || completed === undefined) {
        res.status(400).json({ message: "Missing required fields." });
        return;
      }

      const task: Task = { id, title, description, completed, userId };
      const updatedUser = await userService.addTaskToUser(userId, task);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("ERROR [addTaskToUser] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Missing email or password." });
        return;
      }

      const user = await userService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials." });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error("ERROR [login] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedUser = await userService.updateUser(id, updatedData);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("ERROR [updateUser] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);

      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      res.status(200).send();
    } catch (error) {
      console.error("ERROR [deleteUser] > ", error);
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
}
