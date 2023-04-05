import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeComponent } from './employe/employe.component';
import { UserComponent } from './user/user.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';




const routes: Routes = [
  { path: '',pathMatch:'full' ,redirectTo:"login"},
  { path: 'role', component: RoleComponent },
  { path: 'user', component: UserComponent },
  { path: 'employe', component: EmployeComponent },
  { path: 'tutorial', component: TutorialComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
