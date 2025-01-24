import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", UserController.login);

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);
router.post("/:userId/tasks", UserController.addTaskToUser);

router.use(authMiddleware); // Rotas que estão abaixo desse router.use precisam ser autenticadas pelo Token

router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
