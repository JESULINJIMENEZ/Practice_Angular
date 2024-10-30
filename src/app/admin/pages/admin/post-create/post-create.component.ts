import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: true, // Marca el componente como standalone
  imports: [ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule aquí
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
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
      const newUser: IUser = this.userForm.value;
      this.postService.createUser(newUser);
      this.userForm.reset(); // Reinicia el formulario después de enviar
      console.log("Usuario creado:", newUser);
    }
  }
}
