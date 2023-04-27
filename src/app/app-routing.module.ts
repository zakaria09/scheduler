import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'
import { SecureComponent } from './secure/secure.component'
import { AuthComponent } from './auth/auth.component'
import { LoginComponent } from './login/login.component'
import { SchedulesComponent } from './schedules/schedules.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'secure', pathMatch: 'full' },
  { path: 'secure', canActivate: [ AuthGuard ], component: SecureComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'schedules', component: SchedulesComponent, resolve: { user: UserResolver } },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class AppRoutingModule { }
