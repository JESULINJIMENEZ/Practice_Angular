import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true, 
  imports: [ReactiveFormsModule], 
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostServiceService, private router: Router) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, this.noWhitespaceValidator]],
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  noWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: IUser = {
        ...this.userForm.value,
        // id: undefined, // No envíes el id si no es necesario
      };
  
      this.postService.createUser(newUser);
      this.userForm.reset();
      console.log("Usuario creado:", newUser);
      this.router.navigate(['/admin/post/list']);
    } else {
      console.log("Formulario inválido", this.userForm.errors);
    }
  }
  
}
