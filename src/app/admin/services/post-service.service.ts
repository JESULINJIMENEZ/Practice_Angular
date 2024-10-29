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
    this.http.get<IUser[]>("https://jsonplaceholder.typicode.com/users").subscribe(users => {
      this.userSubject.next(users);
    });
  }

  addUser(user: IUser) {
    // Simulando un nuevo ID y agregando el usuario a la lista.
    const newUser = { ...user, id: Date.now() } as IUser; 
    this.userSubject.next([...this.userSubject.value, newUser]);
  }
}
