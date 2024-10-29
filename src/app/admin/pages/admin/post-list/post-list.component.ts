import { Component } from '@angular/core';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostLisComponent {

  listPost: IUser[] = []

  constructor(private postService: PostServiceService){
    this.postService.getUser().subscribe({
      next:(user)=> {
        this.listPost = user
        console.log(this.listPost)
        
      },
      error: (error) => {
        console.log(error);
        
      }
    })
  }

}
