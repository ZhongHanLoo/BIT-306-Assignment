import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FwaAnalyticsComponent } from './components/fwa-analytics/fwa-analytics.component';
import { ReviewScheduleComponent } from './components/review-schedule/review-schedule.component';
import { UpdateScheduleComponent } from './components/update-schedule/update-schedule.component';
import { SubmitFWAComponent } from './components/submit-fwa/submit-fwa.component';
import { ReviewFWAComponent } from './components/review-fwa/review-fwa.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'submitFwa', component: SubmitFWAComponent },
  { path: 'reviewFwa', component: ReviewFWAComponent },
  { path: 'updateSchedule', component: UpdateScheduleComponent },
  { path: 'reviewSchedule', component: ReviewScheduleComponent },
  { path: 'fwaAnalytics', component: FwaAnalyticsComponent },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
