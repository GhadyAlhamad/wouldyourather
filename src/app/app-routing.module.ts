import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { AuthGuard } from './auth/auth.guard';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questions/:question_id',
    component: QuestionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: PagenotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
