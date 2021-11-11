import { PopUpServiceService } from './../Services/pop-up-service.service';
import { ReviewService } from './../Services/review.service';
import { environment } from './../../environments/environment';
import { imgFolder } from './../shared/constantes';
import { Component, enableProdMode, OnInit } from '@angular/core';
import Query from 'devextreme/data/query';
import { AgendaService } from '../Services/agenda.service';
import { Subscription } from 'rxjs';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  appointmentsData: any;

  currentDate: Date = new Date();

  imgFolder = imgFolder;  

  constructor(private agendaService : AgendaService, 
              private cookieService: CookieService,
              private reviewService: ReviewService,
              private popUpServiceService: PopUpServiceService) {
    const url = environment.apiLink;

    this.appointmentsData = AspNetData.createStore({
      key: 'id',
      loadUrl: `${url}sessions`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.headers = { 'Authorization': 'Bearer '+ cookieService.get('tok') };
      }
    });
  }

  async ngOnInit(): Promise<void> {
  }

  async onAppointmentFormOpening(data: any){
    data.cancel = true;
    this.reviewService.initNoteObservation();
    this.reviewService.setSession(data.appointmentData);
    const getReview: boolean = await this.reviewService.getReview();
    if(!getReview){
      this.popUpServiceService.setBigTitle('خطأ أثناء تحميل التقييم')
      this.popUpServiceService.setTitle('خطأ في الإتصال');
      this.popUpServiceService.setMsg('لا يمكن تحميل تقييم هذه الجلسة');
      this.popUpServiceService.displayPopUp();
    }else{
      this.reviewService.displayPopUp();
    }
  }

}
