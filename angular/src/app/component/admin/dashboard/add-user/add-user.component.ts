import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from '../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { addUser } from '../../../../store/admin/admin.action';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  signupForm!: FormGroup;
  profileImg!: string | ArrayBuffer | null;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  @Output() closeModalEvent = new EventEmitter();

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  submitForm() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;

      const user: IUser = {
        _id: '',
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        phone: formValues.phone,
        profileImg: this.profileImg
      };

      this.store.dispatch(addUser({ user }));
      this.closeModal();
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}