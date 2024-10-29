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
    // Suscribirse a la lista de usuarios
    this.postService.users$.subscribe(users => {
      this.listPost = users;
    });
  }

  editUser(user: IUser) {
    // Aquí podrías abrir un formulario o un modal para editar el usuario
    console.log('Edit user:', user);
    // Llama a tu método de servicio para editar el usuario
    this.postService.editUser(user);
  }

  deleteUser(userId: number) {
    // Llama al método del servicio para eliminar el usuario
    this.postService.deleteUser(userId);
  }
}
