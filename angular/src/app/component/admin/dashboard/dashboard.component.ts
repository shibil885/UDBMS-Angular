import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/models/user.model';
import { getAllUsers, removeUser } from '../../../store/admin/admin.action';
import { selectAdminError, selectAdminLoading, selectAdminSuccess, selectUsers } from '../../../store/admin/admin.selector';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true,
  imports:[EditUserComponent,AddUserComponent,CommonModule]
})
export class DashboardComponent implements OnInit {
  users: Observable<IUser[]> = this.store.select(selectUsers);
  loading$: Observable<boolean> = this.store.select(selectAdminLoading);
  error$: Observable<string | null> = this.store.select(selectAdminError);
  success$: Observable<string | null> = this.store.select(selectAdminSuccess);

  addUsershowModal!: boolean;
  editUsershowModal!: boolean;
  userToEdit!: IUser;  

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllUsers());
  }

  removeUser(email: string) {
    this.store.dispatch(removeUser({ email }));
  }

  addUser() {
    this.addUsershowModal = true;
  }

  closeAddUser(event: boolean) {
    this.addUsershowModal = event;
  }

  editUser(user: IUser) {
    this.userToEdit = user;
    this.editUsershowModal = true;
  }

  closeEditUser(event: boolean) {
    this.editUsershowModal = event;
  }
}
