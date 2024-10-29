import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  listPost: IUser[] = []

  constructor(
    private http: HttpClient
  ) { }

getUser(){
  return this.http.get<IUser[]>("https://jsonplaceholder.typicode.com/users")
}

}
