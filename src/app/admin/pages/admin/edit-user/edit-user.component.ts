import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: number; 

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, this.noWhitespaceValidator]],
      username: ['', [Validators.required, this.noWhitespaceValidator]],
      correo: ['', [Validators.required, Validators.email]], 
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];  // Convertir a número
      this.loadUser();
    });
  }

  loadUser() {
    const user = this.postService.getUserById(this.userId);
    if (user) {
      this.userForm.patchValue({
        nombre: user.nombre,
        username: user.username,
        correo: user.correo,
      });
    } else {
      console.error("Usuario no encontrado");
    }
  }

  noWhitespaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: IUser = { id: this.userId, ...this.userForm.value };
      this.postService.editUser(updatedUser);
      this.router.navigate(['/admin/post/list']);
    } else {
      console.log("Formulario inválido", this.userForm.errors);
    }
  }
}
