import { users } from "../utils/mockDatabase";
import { User } from "../models/User";
import { Task } from "../models/Task";

export class UserService {
  getAllUsers(): User[] {
    return users;
  }

  getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  createUser(newUser: User): User {
    users.push(newUser);
    return newUser;
  }

  addTaskToUser(id: string, task: Task): User | null {
    const user = users.find((user) => user.id === id);

    if (!user) return null;

    user.tasks = user.tasks ? [...user.tasks, task] : [task];
    return user;
  }

  updateUser(id: string, updatedUser: Partial<User>): User | null {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updatedUser };
    return users[userIndex];
  }

  deleteUser(id: string): boolean {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }
}
