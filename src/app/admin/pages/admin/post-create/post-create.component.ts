import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule], // Asegúrate de incluir esto
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostServiceService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.postService.addUser(this.userForm.value);
      this.userForm.reset(); // Resetear el formulario
    }
  }
}
