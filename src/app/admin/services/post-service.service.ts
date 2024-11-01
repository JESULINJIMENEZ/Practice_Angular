import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private userSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<IUser[]>("https://jsonplaceholder.typicode.com/users").subscribe(apiUsers => {
      const localUsers = this.loadUsersFromLocalStorage();
      const allUsers = [...apiUsers, ...localUsers];
      this.userSubject.next(allUsers);
    });
  }

  private loadUsersFromLocalStorage(): IUser[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  createUser(user: IUser) {
    const newUser = { ...user, id: Date.now() }; // Simulando un nuevo ID
    const currentUsers = this.userSubject.getValue();
    currentUsers.push(newUser);
    this.userSubject.next(currentUsers);
    
    // Guardar el nuevo usuario en localStorage
    this.saveUsersToLocalStorage(currentUsers);
  }

  editUser(user: IUser) {
    const currentUsers = this.userSubject.getValue();
    const index = currentUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      currentUsers[index] = { ...user }; // Actualiza el usuario
      this.userSubject.next(currentUsers);
      this.saveUsersToLocalStorage(currentUsers); // Actualiza localStorage
    }
  }

  deleteUser(id: number) {
    const currentUsers = this.userSubject.getValue();
    const index = currentUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      currentUsers.splice(index, 1);
      this.userSubject.next(currentUsers);
      this.saveUsersToLocalStorage(currentUsers); // Actualiza localStorage
    }
  }

  getUserById(id: number): IUser | undefined {
    return this.userSubject.getValue().find(user => user.id === id);
  }

  private saveUsersToLocalStorage(users: IUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
