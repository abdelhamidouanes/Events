import { AuthentificationService } from './../Services/authentification.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit, OnDestroy {

  token: string
  tokenSubscription: Subscription;

  constructor(private router: Router, private authentificationService: AuthentificationService) { 
    this.token= '';
    this.tokenSubscription = new Subscription();
  }

  ngOnDestroy(): void {
     this.tokenSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tokenSubscription = this.authentificationService.tokenSubject.subscribe(data => {
      this.token = data;
    });
    this.authentificationService.emitToken();
  }


  displayHeaderFooter(): boolean{
    if(['/signIn','/signUp'].includes(this.router.url) || this.token == ''){
      return false;
    }
    else{
      return true;
    }
  }

}
