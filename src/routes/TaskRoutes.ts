import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();

router.get("/tasks", TaskController.getAllTasks);
router.get("/tasks/:id", TaskController.getTaskById);
router.post("/tasks", TaskController.createTask);
router.put("/tasks/:id", TaskController.updateTask);
router.delete("/tasks/:id", TaskController.deleteTask);

export default router;
