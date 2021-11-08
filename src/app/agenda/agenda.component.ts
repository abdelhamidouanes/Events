import { imgFolder } from './../shared/constantes';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Models/appointment.model';
import Query from 'devextreme/data/query';
import { AgendaService } from '../Services/agenda.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  
  appointmentsData: Appointment[];
  appointmentsDataSubscription : Subscription;

  currentDate: Date = new Date(2021, 3, 29);
  imgFolder = imgFolder;  

  constructor(private agendaService : AgendaService) {
      
    this.appointmentsData = [];
    this.appointmentsDataSubscription= this.agendaService.appointmentsDataSubject.subscribe(data =>{
        this.appointmentsData = data;
    });
    this.agendaService.emitAppointmentsData();
  
  }

  ngOnInit(): void {
  }

  getElementById(id: any) {
    return Query(this.appointmentsData).filter(["id", "=", id]).toArray()[0];
  }

  onAppointmentFormOpening(data: any){
    data.cancel = true;  
  }

}
