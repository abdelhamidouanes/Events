import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OutletComponent } from './outlet/outlet.component';
import { FormsModule } from '@angular/forms';
import { DxLoadPanelModule, DxMenuModule, DxSchedulerModule } from 'devextreme-angular';
import { AgendaComponent } from './agenda/agenda.component';
import { AlertMsgComponent } from './alert-msg/alert-msg.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { VoteComponent } from './vote/vote.component';
import { PresenceComponent } from './presence/presence.component';
import { MenuComponent } from './menu/menu.component';


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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DxLoadPanelModule,
    DxSchedulerModule,
    DxMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
