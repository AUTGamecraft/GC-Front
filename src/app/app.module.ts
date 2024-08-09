import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';
import {HomeComponent} from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DashboardEventComponent} from './dashboard-event/dashboard-event.component';
import {DashboardMediaComponent} from './dashboard-media/dashboard-media.component';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {PeopleComponent} from './people/people.component';
import {RulesComponent} from './rules/rules.component';
import {InvalidPageComponent} from './invalid-page/invalid-page.component';
import {DashboardTeamsComponent} from './dashboard-teams/dashboard-teams.component';
import {DashboardCreateGameComponent} from './dashboard-create-game/dashboard-create-game.component';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {ConfirmConfirmComponent} from './confirm-confirm/confirm-confirm.component';
import {CartComponent} from './cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {ForgotComponent} from './forgot/forgot.component';
import {NewpasswordComponent} from './newpassword/newpassword.component';
import {GamesComponent} from './games/games.component';
import {GameComponent} from './game/game.component';
import {GameContentComponent} from './game-content/game-content.component';
import {CreatorComponent} from './creator/creator.component';
import {CommentsComponent} from './comments/comments.component';
import {CommentComponent} from './comment/comment.component';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatCard, MatCardContent, MatCardTitleGroup, MatCardModule} from '@angular/material/card';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SignUpPageComponent,
        HomeComponent,
        DashboardEventComponent,
        DashboardMediaComponent,
        ErrorDialogComponent,
        PeopleComponent,
        RulesComponent,
        InvalidPageComponent,
        DashboardTeamsComponent,
        DashboardCreateGameComponent,
        EmailConfirmComponent,
        ConfirmConfirmComponent,
        CartComponent,
        SuccessDialogComponent,
        ForgotComponent,
        NewpasswordComponent,
        GamesComponent,
        GameComponent,
        GameContentComponent,
        CreatorComponent,
        CommentsComponent,
        CommentComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatExpansionModule,
        MatBadgeModule,
        MatSidenavModule,
        MatButton,
        MatInput,
        MatLabel,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatDialogClose,
        MatCardModule,
        MatCard,
        MatCardTitleGroup,
        MatCardContent,
        MatFormField], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
