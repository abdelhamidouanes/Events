import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopUpServiceService } from '../Services/pop-up-service.service';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit, OnDestroy {


  bigTitle: string;
  bigTitleSubscription : Subscription;

  title : string;
  titleSubscription : Subscription;

  msg : string;
  msgSubscription : Subscription;

  constructor(private popUpServiceService: PopUpServiceService) { 
    this.title ='';
    this.msg ='';
    this.bigTitle = '';

    this.titleSubscription = new Subscription();
    this.msgSubscription = new Subscription();
    this.bigTitleSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
    this.msgSubscription.unsubscribe();
    this.bigTitleSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.titleSubscription = this.popUpServiceService.titleSubject.subscribe(data => {
      this.title = data;
    });
    this.popUpServiceService.emitTitle();

    this.msgSubscription = this.popUpServiceService.msgSubject.subscribe(data => {
      this.msg = data;
    });
    this.popUpServiceService.emitMsg();

    this.bigTitleSubscription = this.popUpServiceService.bigTitleSubject.subscribe(data => {
      this.bigTitle = data;
    });
    this.popUpServiceService.emitBigTitle();
  }

  onClick(): void{
    this.popUpServiceService.unDisplayPopUp();
  } 


}
