import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyQrCodeComponent } from './my-qr-code/my-qr-code.component';
import { PresenceComponent } from './presence/presence.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path : '', canActivate: [AuthGuardService], component : HomeComponent},
  {path : 'signIn', component : SignInComponent},
  {path : 'signUp', component : SignUpComponent},
  {path : 'myQrCode', canActivate: [AuthGuardService], component : MyQrCodeComponent},
  {path : 'attendance', canActivate: [AuthGuardService], component : PresenceComponent},
  {path : '**', redirectTo : ''}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }