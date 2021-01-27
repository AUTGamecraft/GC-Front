import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardMediaComponent } from './dashboard-media/dashboard-media.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  {path: 'dashboard-media',component:DashboardMediaComponent},
  {path: 'signup',component:SignUpPageComponent},
  {path: 'dashboard-event',component:DashboardEventComponent},
  {path: 'home',component:HomeComponent,

  children:[
    {path:'login',component:LoginComponent}
  ]
},
  {path: 'login',component:LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
