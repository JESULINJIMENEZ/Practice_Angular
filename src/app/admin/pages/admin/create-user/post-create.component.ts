import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PostServiceService } from '../../../services/post-service.service';
import { IUser } from '../../../interface/user';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageFlashService } from '../../../../shared/message-flash.service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-post-create',
  standalone: true, 
  imports: [ReactiveFormsModule], 
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private postService: PostServiceService, 
    private router: Router,
    private messageFlashService: MessageFlashService // Importa el servicio de mensajes
  ) {
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
      };
  
      this.postService.createUser(newUser);
      this.userForm.reset();


      this.messageFlashService.success('Usuario creado con éxito');
      
      console.log("Usuario creado:", newUser);
      this.router.navigate(['/admin/post/list']);
    } else {
      console.log("Formulario inválido", this.userForm.errors);

      this.messageFlashService.danger('Formulario inválido. Por favor, corrige los errores.');
    }
  }
}
