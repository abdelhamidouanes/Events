import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Subscription } from 'rxjs';
import { PopUpServiceService } from '../Services/pop-up-service.service';
import { PresenceService } from '../Services/presence.service';

@Component({
  selector: 'app-presence2',
  templateUrl: './presence2.component.html',
  styleUrls: ['./presence2.component.css']
})
export class Presence2Component implements OnInit, OnDestroy {
 
  @ViewChild('scanner') scanner: ZXingScannerComponent | any;
  hasDevices: boolean| any;
  hasPermission: boolean| any;
  qrResultString: string| any;
  qrResult: Result | any;
  availableDevices: MediaDeviceInfo[]| any;
  currentDevice: MediaDeviceInfo| any;
  response : string;

  successAttendance : boolean;

  allAttendance : any[];
  allAttendanceSubscription : Subscription;

  loadingScanAddQRcode: boolean;

   
  currentSession: string;
  currentSessionSubscription: Subscription;

  constructor(private presenceService: PresenceService, 
              private popUpServiceService: PopUpServiceService,
              private router: Router) { 
    this.response = '';
    this.allAttendance = [];
    this.allAttendanceSubscription = new Subscription();
    this.successAttendance = false;
    this.currentSession = '';
    this.currentSessionSubscription = new Subscription();
    this.loadingScanAddQRcode = false;
  }

  ngOnInit(): void {

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

  ngOnDestroy(): void {
    this.allAttendanceSubscription.unsubscribe();
    this.currentSessionSubscription.unsubscribe();
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

  onClickChangeCurrentSession(){
    this.router.navigate(['/attendance']);
  }

}
