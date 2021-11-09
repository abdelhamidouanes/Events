import { environment } from './../../environments/environment';
import { imgFolder } from './../shared/constantes';
import { Component, enableProdMode, OnInit } from '@angular/core';
import Query from 'devextreme/data/query';
import { AgendaService } from '../Services/agenda.service';
import { Subscription } from 'rxjs';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  appointmentsData: any;

  currentDate: Date = new Date();

  imgFolder = imgFolder;  

  constructor(private agendaService : AgendaService, private cookieService: CookieService) {
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

  onAppointmentFormOpening(data: any){
    data.cancel = true;  
  }

}
