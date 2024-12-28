import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userRegistration } from '../../../store/users/user.action';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectUserError } from '../../../store/users/user.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  signupForm: FormGroup;
  errorMessage$!: Observable<string | null>;


  constructor(private fb: FormBuilder, private store: Store) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3)]],
      phone: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(selectUserError);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  submitForm() {
    if (this.signupForm.valid) {
      const { confirmPassword, ...signupData } = this.signupForm.value;
      this.store.dispatch(userRegistration({ user:{signupData} }));
    } else {
      this.signupForm.markAllAsTouched(); 
    }
  }

  get name() { return this.signupForm.get('name'); }
  get phone() { return this.signupForm.get('phone'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
}