import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ConfirmConfirmComponent } from './confirm-confirm/confirm-confirm.component';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardMediaComponent } from './dashboard-media/dashboard-media.component';
import { DashboardTeamsComponent } from './dashboard-teams/dashboard-teams.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';
import { LoginComponent } from './login/login.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { PeopleComponent } from './people/people.component';
import { RulesComponent } from './rules/rules.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'dashboard-media', component: DashboardMediaComponent },
  // { path: 'signup', component: SignUpPageComponent },
  // { path: 'dashboard-event', component: DashboardEventComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'people', component: PeopleComponent },
  // { path: 'rules', component: RulesComponent },
  // { path: 'email-confirm', component: EmailConfirmComponent },
  // { path: 'dashboard-teams', component: DashboardTeamsComponent },
  // { path: 'confirm-confirm', component: ConfirmConfirmComponent },
  // { path: 'cart', component: CartComponent },
  // {path : 'forgot',component : ForgotComponent},
  // {path : 'newpassword',component : NewpasswordComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
