import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLogout } from '../../../store/users/user.action';
import { selectUserToken } from '../../../store/users/user.selector';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private store:Store) {}
  userLogout(){
    this.store.dispatch(userLogout())
  }
}
