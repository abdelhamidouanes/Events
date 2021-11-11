import { PopUpServiceService } from './../Services/pop-up-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../Services/loading.service';
import { ReclamationService } from '../Services/reclamation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {


  reclamations: any[];
  reclamationSubscription : Subscription;

  constructor(private loadingService: LoadingService, 
              private reclamationService: ReclamationService,
              private popUpServiceService: PopUpServiceService) {
                this.reclamations = [];
                this.reclamationSubscription = new Subscription();
 }

  async ngOnInit(): Promise<void> {
    this.reclamationSubscription = this.reclamationService.reclamationSubject.subscribe(data => {
      this.reclamations = data;
    });
    this.reclamationService.emitReclamation();
    const getreclamation : boolean = await this.reclamationService.getListeReclamation();
    if(!getreclamation){
      this.popUpServiceService.setBigTitle('خطأ في التحميل')
      this.popUpServiceService.setTitle('خطأ في تحميل قائمة الشكاوى');
      this.popUpServiceService.setMsg('خطأ في تحميل قائمة الشكاوى');
      this.popUpServiceService.displayPopUp();
    }
  }
  
  async onSubmit(form: NgForm){ 
    this.loadingService.displayLoading();
    const reclamation = form.value['reclamation']; ; 
    let submitted : boolean = await this.reclamationService.submitReclamtion(reclamation);
    if(submitted){
      this.popUpServiceService.setBigTitle('تم إرسال التبليغ بنجاح')
      this.popUpServiceService.setTitle('تم الارسال بنجاح');
      this.popUpServiceService.setMsg('تم إرسال التبليغ بنجاح');
      this.popUpServiceService.displayPopUp();
      this.loadingService.unDisplayLoading();
    }else{
      this.popUpServiceService.setBigTitle('خطأ في الإرسال أو التحميل')
      this.popUpServiceService.setTitle('خطأ أثناء التبليغ');
      this.popUpServiceService.setMsg('خطأ في إرسال أو تحميل قائمة الشكاوى');
      this.popUpServiceService.displayPopUp();
      this.loadingService.unDisplayLoading();
    }
  } 

}
