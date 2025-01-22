import express, { json } from "express";

import taskRoutes from "./routes/TaskRoutes";
import userRoutes from "./routes/UserRoutes";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(json());
app.use(loggerMiddleware);

app.use("/users", userRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
