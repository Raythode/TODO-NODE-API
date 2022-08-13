import { Request, Response, NextFunction } from "express";
import { v4 as generateId } from "uuid";

interface TodoItem {
  id: String;
  subject: String;
  description: String;
}

let todoItemsStored: Array<TodoItem> = [];

// getting all todos
const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(todoItemsStored);
};

const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  const todo = todoItemsStored.find((todoItem) => todoItem.id === id);

  return res.status(200).json(todo);
};

const updateTodoItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  let subject: string = req.body.subject ?? null;
  let description: string = req.body.description ?? null;

  const todoItemIndex = todoItemsStored.findIndex(
    (todoItem) => todoItem.id === id
  );

  todoItemsStored[todoItemIndex] = {
    ...todoItemsStored[todoItemIndex],
    ...(subject && { subject }),
    ...(description && { description }),
  };

  return res.status(200).json({
    message: "updated todo item sucessfully!",
  });
};

const deleteTodoItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  todoItemsStored = todoItemsStored.filter((todoItem) => todoItem.id !== id);

  return res.status(200).json({
    message: "deleted todo item sucessfully!",
  });
};

const addTodoItem = async (req: Request, res: Response, next: NextFunction) => {
  const id: String = generateId();
  let subject: String = req.body.subject;
  let description: String = req.body.description ?? null;

  if (!subject) {
    return res.status(400).json({
      message: "Please provide a valid subject to add todo!",
    });
  }

  todoItemsStored.push({
    id,
    subject,
    description,
  });

  return res.status(200).json({
    message: "todo item added sucessfully!",
  });
};

export default {
  getTodos,
  getTodoById,
  updateTodoItem,
  deleteTodoItem,
  addTodoItem,
};
