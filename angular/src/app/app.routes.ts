import { Routes } from '@angular/router';
import { HomeComponent } from './component/user/home/home.component';
import { SignupComponent } from './component/user/signup/signup.component';
import { LoginComponent } from './component/user/login/login.component';
import { adminLoginComponent } from './component/admin/login/login.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AuthGuard, IsNotAuth } from './shared/gurd/authGurd';
import { AuthGuardAdmin, IsNotAuthAdmin } from './shared/gurd/adminAuth';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [IsNotAuth] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
    { path: 'admin/login', component: adminLoginComponent, canActivate: [AuthGuardAdmin] },
    { path: 'admin/dashboard', component: DashboardComponent, canActivate: [IsNotAuthAdmin] }
];