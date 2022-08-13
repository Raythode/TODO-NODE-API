import express from "express";
import controller from "../controllers/todos";
const router = express.Router();

router.get("/todos", controller.getTodos);
router.get("/todos/:id", controller.getTodoById);
router.put("/todos/:id", controller.updateTodoItem);
router.delete("/todos/:id", controller.deleteTodoItem);
router.post("/todos", controller.addTodoItem);

export = router;
