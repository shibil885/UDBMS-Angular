import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { adminLogin } from '../../../store/admin/admin.action';
import { selectAdminError } from '../../../store/admin/admin.selector';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class adminLoginComponent {
  loginForm!: FormGroup;
  error$  = this.store.select(selectAdminError)
  constructor(private fb: FormBuilder,private store:Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  loginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(adminLogin({admin:{email,password}}))
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
