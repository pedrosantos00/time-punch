import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
{path :'' , component: MainPageComponent},
{path:'login', component: LoginComponent},
{path:'signup', component: SignupComponent},
{path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
{path:'reset', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
