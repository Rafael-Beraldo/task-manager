import { Task } from "../models/Task";
import { User } from "../models/User";

export const tasks: Task[] = [
  {
    id: "101",
    title: "Task 1",
    description: "Do the dishes",
    completed: false,
    userId: "1",
  },
  {
    id: "102",
    title: "Task 2",
    description: "Walk the dog",
    completed: false,
    userId: "2",
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    tasks: [],
    lastname: "",
    age: 0,
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    tasks: [],
    lastname: "",
    age: 0,
  },
];
