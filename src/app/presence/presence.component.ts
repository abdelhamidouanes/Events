import { PopUpServiceService } from './../Services/pop-up-service.service';
import { PresenceService } from './../Services/presence.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit, OnDestroy {
 
  @ViewChild('scanner') scanner: ZXingScannerComponent | any;
  hasDevices: boolean| any;
  hasPermission: boolean| any;
  qrResultString: string| any;
  qrResult: Result | any;
  availableDevices: MediaDeviceInfo[]| any;
  currentDevice: MediaDeviceInfo| any;

  response : string;
  allSession : any[];
  allSessionSubscription : Subscription;
  successAttendance : boolean;

  allAttendance : any[];
  allAttendanceSubscription : Subscription;

  currentSession: string;
  currentSessionSubscription: Subscription;

  loadingScanAddQRcode: boolean;

  constructor(private presenceService: PresenceService, private popUpServiceService: PopUpServiceService) { 
    this.response = '';
    this.allSession = [];
    this.allSessionSubscription = new Subscription();
    this.allAttendance = [];
    this.allAttendanceSubscription = new Subscription();
    this.successAttendance = false;
    this.currentSession = '';
    this.currentSessionSubscription = new Subscription();
    this.loadingScanAddQRcode = false;
  }

  ngOnDestroy(): void {
    this.allSessionSubscription.unsubscribe();
    this.allAttendanceSubscription.unsubscribe();
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

    this.allAttendanceSubscription = this.presenceService.allAttendanceSubject.subscribe(data=> {
      this.allAttendance = data;
    });
    this.presenceService.emitAllAttendance();

    this.currentSessionSubscription = this.presenceService.currentSessionSubject.subscribe(data => {
      this.currentSession = data;
    });
    this.presenceService.emitCurrentSession();


    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        this.hasDevices = true;
        this.availableDevices = devices;
    });
    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);

  }


  displayCameras(cameras: MediaDeviceInfo[]) {
      this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
      this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
      this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }

  async scanSuccessHandler(qrcode: any):Promise<void> {
    if(!this.loadingScanAddQRcode){
        this.loadingScanAddQRcode = true;
        if(this.currentSession==''){
          this.popUpServiceService.setBigTitle('خطأ أثناء الإضافة');
          this.popUpServiceService.setTitle('إضافة حضور جديد غير ممكن');
          this.popUpServiceService.setMsg('يرجى تحديد جلسة ');
          this.popUpServiceService.displayPopUp();
        }else{
          if(!await this.presenceService.addNewAttendance(this.currentSession, qrcode)){
            this.popUpServiceService.setBigTitle('خطأ في الإرسال أو التحميل');
            this.popUpServiceService.setTitle('خطأ أثناء إضافة الحضور ');
            this.popUpServiceService.setMsg('خطأ في إضافة أو تحميل قائمة الحاضرين');
            this.popUpServiceService.displayPopUp();
            this.successAttendance = false;
            this.response = 'فشل في إضافة حضور جديد';
            setTimeout(() => {
              this.response ='';
            }, 5000);
            this.loadingScanAddQRcode = false;
          }else{
            this.successAttendance = true;
            this.response = qrcode+'إضافة حضور بنجاح '; 
            setTimeout(() => {
              this.response ='';
              this.loadingScanAddQRcode = false;
            }, 5000);
          }
        }
    }
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

  async onAddQRCodeText(form: NgForm){
    const qrcode = form.value['qrcode-text']; 
    if(!this.loadingScanAddQRcode){
      this.loadingScanAddQRcode = true;
      if(qrcode=='' || this.currentSession==''){
        this.popUpServiceService.setBigTitle('خطأ أثناء الإضافة');
        this.popUpServiceService.setTitle('إضافة حضور جديد غير ممكن');
        this.popUpServiceService.setMsg('يرجى تحديد جلسة وإدخال اسم المستخدم');
        this.popUpServiceService.displayPopUp();
      }else{
        if(!await this.presenceService.addNewAttendance(this.currentSession, qrcode)){
          this.popUpServiceService.setBigTitle('خطأ في الإرسال أو التحميل');
          this.popUpServiceService.setTitle('خطأ أثناء إضافة الحضور ');
          this.popUpServiceService.setMsg('خطأ في إضافة أو تحميل قائمة الحاضرين');
          this.popUpServiceService.displayPopUp();
          this.successAttendance = false;
          this.response = 'فشل في إضافة حضور جديد';
          setTimeout(() => {
            this.response ='';
          }, 5000);
          this.loadingScanAddQRcode = false;
        }else{
          this.successAttendance = true;
          this.response = 'إضافة حضور بنجاح ل '+qrcode+'.';
          setTimeout(() => {
            this.response ='';
            this.loadingScanAddQRcode = false;
          }, 5000);
        }
      }
    }
  }

  emptyAllAttendance(): boolean{
    return this.allAttendance.length ==0 ;
  }

  onNextClick(){
    this.loadingScanAddQRcode = false;
    this.response ='';
  }

}
