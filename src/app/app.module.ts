import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {LoginComponent} from './login/login.component';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {SignUpPageComponent} from './sign-up-page/sign-up-page.component';
import {HomeComponent} from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatLegacySnackBar as MatSnackBar, MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {DashboardEventComponent} from './dashboard-event/dashboard-event.component';
import {DashboardMediaComponent} from './dashboard-media/dashboard-media.component';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {PeopleComponent} from './people/people.component';
import {RulesComponent} from './rules/rules.component';
import {InvalidPageComponent} from './invalid-page/invalid-page.component';
import {DashboardTeamsComponent} from './dashboard-teams/dashboard-teams.component';
import {DashboardCreateGameComponent} from './dashboard-create-game/dashboard-create-game.component';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {EmailConfirmComponent} from './email-confirm/email-confirm.component';
import {ConfirmConfirmComponent} from './confirm-confirm/confirm-confirm.component';
import {CartComponent} from './cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ForgotComponent} from './forgot/forgot.component';
import {NewpasswordComponent} from './newpassword/newpassword.component';
import {GamesComponent} from './games/games.component';
import {GameComponent} from './game/game.component';
import {GameContentComponent} from './game-content/game-content.component';
import {CreatorComponent} from './creator/creator.component';
import {CommentsComponent} from './comments/comments.component';
import {CommentComponent} from './comment/comment.component';

@NgModule({
    declarations: [
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
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatSidenavModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
