import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  listPost: IUser[] = [];

  constructor(private postService: PostServiceService, private router: Router) { 
   this.postService.loadUsers();
    this.postService.users$.subscribe(users => {
      this.listPost = users;
    });
  }

  editUser(user: IUser) {
    
    this.router.navigate(['/admin/post/edit', user.id]); 
  }

  deleteUser(userId?: number) {
    if (userId) {
      this.postService.deleteUser(userId);
    } else {
      console.error('No se puede eliminar: el ID del usuario es indefinido');
    }
  }
}
