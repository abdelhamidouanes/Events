import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OutletComponent } from './outlet/outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxListModule, DxLoadPanelModule, DxMenuModule, DxSchedulerModule } from 'devextreme-angular';
import { AgendaComponent } from './agenda/agenda.component';
import { AlertMsgComponent } from './alert-msg/alert-msg.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { VoteComponent } from './vote/vote.component';
import { PresenceComponent } from './presence/presence.component';
import { MenuComponent } from './menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { MyQrCodeComponent } from './my-qr-code/my-qr-code.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ProgrammeComponent } from './programme/programme.component';
import { ChangementpwComponent } from './changementpw/changementpw.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    OutletComponent,
    AgendaComponent,
    AlertMsgComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    VoteComponent,
    PresenceComponent,
    MenuComponent,
    MyQrCodeComponent,
    ReclamationComponent,
    ProgrammeComponent,
    ChangementpwComponent,
    ReviewComponent
  ],
  imports: [ 
    MbscModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DxLoadPanelModule,
    DxMenuModule,
    NgxQRCodeModule,
    CommonModule,		
		ZXingScannerModule,
    DxListModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DxSchedulerModule
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
