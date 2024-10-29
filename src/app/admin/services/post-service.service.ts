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
    // Cargar usuarios desde la API
    this.http.get<IUser[]>("https://jsonplaceholder.typicode.com/users").subscribe(apiUsers => {
      // Cargar usuarios desde localStorage
      const localUsers = this.loadUsersFromLocalStorage();
      // Combinar ambos conjuntos de usuarios
      const allUsers = [...apiUsers, ...localUsers];
      this.userSubject.next(allUsers);
    });
  }

  private loadUsersFromLocalStorage(): IUser[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  createUser(user: IUser) {
    // Simulación de creación de usuario
    const newUser = { ...user, id: Date.now() }; // Simulando un nuevo ID
    const currentUsers = this.userSubject.getValue();
    currentUsers.push(newUser);
    this.userSubject.next(currentUsers);
    
    // Guardar el nuevo usuario en localStorage
    const localUsers = this.loadUsersFromLocalStorage();
    localUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(localUsers));
  }

  editUser(user: IUser){
    // Simulación de edición de usuario
    const currentUsers = this.userSubject.getValue();
    const index = currentUsers.findIndex(u => u.id === user.id);
    if(index!== -1){
      currentUsers[index] = {...user};
      this.userSubject.next(currentUsers);
    }
  }

  deleteUser(id: number){
    // Simulación de eliminación de usuario
    const currentUsers = this.userSubject.getValue();
    const index = currentUsers.findIndex(u => u.id === id);
    if(index!== -1){
      currentUsers.splice(index, 1);
      this.userSubject.next(currentUsers);
    }

    // Eliminar el usuario de localStorage
    const localUsers = this.loadUsersFromLocalStorage();
    localUsers.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(localUsers));
  }

}
