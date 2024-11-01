import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-edit',
  standalone: true, // Si es un componente standalone
  imports: [ReactiveFormsModule, CommonModule], // Importar módulos correctamente
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: number; // Usa el operador ! para indicar que se asignará más adelante

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      this.loadUser();
    });
  }

  loadUser() {
    const user = this.postService.getUserById(this.userId);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: IUser = { id: this.userId, ...this.userForm.value };
      this.postService.editUser(updatedUser);
      this.router.navigate(['/users']); 
      console.log("Usuario actualizado:", updatedUser);
      this.router.navigate(['/admin/post/list'])
    }
  }
}
