import { AuthentificationService } from './../Services/authentification.service';
import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.component.html',
  styleUrls: ['./my-qr-code.component.css']
})
export class MyQrCodeComponent implements OnInit, OnDestroy {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  username: string;
  usernameSubscription :Subscription;

  constructor(private authentificationService : AuthentificationService) { 
    this.username = '';
    this.usernameSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.usernameSubscription = this.authentificationService.usernameSubject.subscribe(data => {
      this.username = data;
    });
    this.authentificationService.emitUsername();
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe();
  }


}
