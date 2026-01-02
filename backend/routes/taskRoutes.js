import express from "express";
import authMiddleware from "../middleware/auth";
const taskRouter = express.Router();

taskRouter
  .route("/gp")
  .get(authMiddleware, getTask)
  .post(authMiddleware, createTask);

taskRouter
  .route("/:id/gp")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default taskRouter;
