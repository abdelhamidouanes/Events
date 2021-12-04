import { PopUpServiceService } from './../Services/pop-up-service.service';
import { PresenceService } from './../Services/presence.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit, OnDestroy {
 

  allSession : any[];
  allSessionSubscription : Subscription;
 
  currentSession: string;
  currentSessionSubscription: Subscription;


  constructor(private presenceService: PresenceService,
              private popUpServiceService: PopUpServiceService,
              private router: Router) {     
    this.allSession = [];
    this.allSessionSubscription = new Subscription();
    this.currentSession = '';
    this.currentSessionSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.allSessionSubscription.unsubscribe();
    this.currentSessionSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {

    if(!await this.presenceService.getAllSessions()){
      this.popUpServiceService.setBigTitle('خطأ في التحميل');
      this.popUpServiceService.setTitle('خطأ في تحميل الجلسات');
      this.popUpServiceService.setMsg('لا يمكن تحميل قائمة الجلسات');
      this.popUpServiceService.displayPopUp();
    }

    this.allSessionSubscription = this.presenceService.allSessionSubject.subscribe(data=> {
      this.allSession = data;
    });
    this.presenceService.emitAllSessions();

    this.currentSessionSubscription = this.presenceService.currentSessionSubject.subscribe(data => {
      this.currentSession = data;
    });
    this.presenceService.emitCurrentSession();

  }

  async onSelectionChanged(session : any):Promise<void>{
    this.presenceService.setCurrentSession(session[0].id);
    if(!await this.presenceService.getAllAttendance(session[0].id)){
      this.popUpServiceService.setBigTitle('خطأ في التحميل');
      this.popUpServiceService.setTitle('خطأ في تحميل قائمة الحضور');
      this.popUpServiceService.setMsg('لا يمكن تحميل قائمة الحضور');
      this.popUpServiceService.displayPopUp();
    }
  }

  onClickPresence1(): void{
    if(this.currentSession==''){
      this.popUpServiceService.setBigTitle('خطأ أثناء الإضافة');
      this.popUpServiceService.setTitle('إضافة حضور جديد غير ممكن');
      this.popUpServiceService.setMsg('يرجى تحديد جلسة ');
      this.popUpServiceService.displayPopUp();
    }else{
      this.router.navigate(['/attendance2']);
    }
  }


}
