import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { editUser, getAllUsers } from '../../../../store/admin/admin.action';
import { IUser } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;

  @Input() currentUser!: IUser;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.currentUser) {
      this.editUserForm.patchValue(this.currentUser);
    }
  }

  closeModal() {
    this.closeModalEvent.emit(false);
  }

  submitForm() {
    if (this.editUserForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.editUserForm.value };
      this.store.dispatch(editUser({ user: updatedUser }));
      this.closeModal();
      this.store.dispatch(getAllUsers())
    } else {
      this.editUserForm.markAllAsTouched();
    }
  }
}
