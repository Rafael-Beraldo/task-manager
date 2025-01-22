import { Task } from "./Task";

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  age: number;
  tasks?: Task[];
}
