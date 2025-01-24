import { Task } from "./Task";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  lastname: string;
  age: number;
  tasks?: Task[];
}
