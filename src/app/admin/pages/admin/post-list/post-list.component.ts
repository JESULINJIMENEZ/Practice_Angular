import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  listPost: IUser[] = [];

  constructor(private postService: PostServiceService) {
    this.postService.users$.subscribe(users => {
      this.listPost = users;
    });
  }
}
