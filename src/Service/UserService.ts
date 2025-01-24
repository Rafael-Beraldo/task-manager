import { users } from "../utils/mockDatabase";
import { User } from "../models/User";
import { Task } from "../models/Task";

import bcrypt from "bcrypt";

export class UserService {
  public getAllUsers(): User[] {
    return users;
  }

  public getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  public getUserByEmail(email: string): User | undefined {
    return users.find((user) => user.email === email);
  }

  public async createUser(newUser: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    users.push(newUser);
    return newUser;
  }

  public async validateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = users.find((user) => user.email === email);

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  public addTaskToUser(id: string, task: Task): User | null {
    const user = users.find((user) => user.id === id);

    if (!user) return null;

    user.tasks = user.tasks ? [...user.tasks, task] : [task];
    return user;
  }

  public updateUser(id: string, updatedUser: Partial<User>): User | null {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updatedUser };
    return users[userIndex];
  }

  public deleteUser(id: string): boolean {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }
}
