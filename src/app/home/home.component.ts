import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../Services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  connected : boolean;
  connectedSubscription : Subscription;

  constructor(private authentificationService: AuthentificationService) { 
    this.connected = false;
    this.connectedSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.connectedSubscription = this.authentificationService.connectedSubject.subscribe(data => {
      this.connected = data;
    });
    this.authentificationService.emitConnected();
  }

}
