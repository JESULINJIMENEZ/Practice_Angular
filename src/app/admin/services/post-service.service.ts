import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private apiUrl = 'http://127.0.0.1:8000/users/';  // Asegúrate de que esta sea la URL correcta
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUsers() {
    this.http.get<IUser[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  createUser(user: IUser): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post<IUser>(this.apiUrl, user, { headers }).subscribe(
      newUser => {
        this.loadUsers();  // Refrescar la lista después de crear
      },
      error => {
        console.error('Error al crear usuario:', error);
      }
    );
  }
  

  getUserById(id: number): IUser | undefined {
    let user: IUser | undefined;
    this.usersSubject.subscribe(users => {
      user = users.find(u => u.id === id);
    });
    return user;
  }

  editUser(updatedUser: IUser): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<IUser>(`${this.apiUrl}${updatedUser.id}/`, updatedUser, { headers }).subscribe(() => {
      this.loadUsers();  // Refrescar la lista después de editar
    }, error => {
      console.error('Error al editar usuario:', error);
    });
  }

  deleteUser(userId: number): void {
    this.http.delete(`${this.apiUrl}${userId}/`).subscribe(() => {
      this.loadUsers();  // Refrescar la lista después de eliminar
    }, error => {
      console.error('Error al eliminar usuario:', error);
    });
  }
}
