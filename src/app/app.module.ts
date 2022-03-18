import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AddComponent } from './pages/add/add.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './data/store/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersEffect } from './data/store/effects/user.effect';
import { AuthService } from './auth/auth.service';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthEffect } from './data/store/effects/auth.effect';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PollcardComponent } from './components/pollcard/pollcard.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageSnackbarComponent } from './components/messagesnackbar/messagesnackbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { LeaderboardcardComponent } from './components/leaderboardcard/leaderboardcard.component';
import { QuestionEffect } from './data/store/effects/question.effect';
import { LeaderboardEffect } from './data/store/effects/leaderboard.effect';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeaderboardComponent,
    AddComponent,
    QuestionsComponent,
    PagenotfoundComponent,
    SignupComponent,
    MessageSnackbarComponent,
    PollcardComponent,
    LeaderboardcardComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    HttpClientModule,
    EffectsModule.forRoot([
      AuthEffect,
      UsersEffect,
      QuestionEffect,
      LeaderboardEffect,
    ]),
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  providers: [HttpClient, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
