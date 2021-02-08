import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardMediaComponent } from './dashboard-media/dashboard-media.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard-media', component: DashboardMediaComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'dashboard-event', component: DashboardEventComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'people', component: PeopleComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
