import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Appointment } from '../Models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  private appointmentsData: any[];
  appointmentsDataSubject : Subject<any[]>;
  
  constructor() { 
    this.appointmentsData = [];
    this.appointmentsDataSubject = new Subject<Appointment[]>();
    this.getAppointmentsData();
  }

  async getAppointmentsData(): Promise<void>{
    this.appointmentsData = await [
        {
            id: 1,
            text: "Website Re-Design Plan",
            startDate: new Date("2021-04-26T16:30:00.000Z"),
            endDate: new Date("2021-04-26T18:30:00.000Z"),
            animation: "foulen ben foulen 1",
            description: "Ceci est un test de description 1",
            image: "workshop.jpg"
        }, {
            id: 2,
            text: "Book Flights to San Fran for Sales Trip",
            startDate: new Date("2021-04-26T19:00:00.000Z"),
            endDate: new Date("2021-04-26T20:00:00.000Z"),
            animation: "foulen ben foulen 2",
            description: "Ceci est un test de description 2",
            image: "formation.jpg",
            allDay: true
        }, {
            id: 3,
            text: "Install New Router in Dev Room",
            startDate: new Date("2021-04-26T21:30:00.000Z"),
            endDate: new Date("2021-04-26T22:30:00.000Z"),
            animation: "foulen ben foulen 3",
            description: "Ceci est un test de description 3",
            image: "workshop.jpg"
        }, {
            id: 4,
            text: "Approve Personal Computer Upgrade Plan",
            startDate: new Date("2021-04-27T17:00:00.000Z"),
            endDate: new Date("2021-04-27T18:00:00.000Z"),
            animation: "foulen ben foulen 4",
            description: "Ceci est un test de description 4",
            image: "formation.jpg"
        }, {
            id: 5,
            text: "Final Budget Review",
            startDate: new Date("2021-04-27T19:00:00.000Z"),
            endDate: new Date("2021-04-27T20:35:00.000Z"),
            animation: "foulen ben foulen 5",
            description: "Ceci est un test de description 5",
            image: "workshop.jpg"
        }, {
            id: 6,
            text: "New Brochures",
            startDate: new Date("2021-04-27T21:30:00.000Z"),
            endDate: new Date("2021-04-27T22:45:00.000Z"),
            animation: "foulen ben foulen 6",
            description: "Ceci est un test de description 6",
            image: "formation.jpg"
        }, {
            id: 7,
            text: "Install New Database",
            startDate: new Date("2021-04-28T16:45:00.000Z"),
            endDate: new Date("2021-04-28T18:15:00.000Z"),
            animation: "foulen ben foulen 7",
            description: "Ceci est un test de description 7",
            image: "workshop.jpg"
        }, {
            id: 8,
            text: "Approve New Online Marketing Strategy",
            startDate: new Date("2021-04-28T19:00:00.000Z"),
            endDate: new Date("2021-04-28T21:00:00.000Z"),
            animation: "foulen ben foulen 8",
            description: "Ceci est un test de description 8",
            image: "workshop.jpg"
        }, {
            id: 9,
            text: "Upgrade Personal Computers",
            startDate: new Date("2021-04-28T22:15:00.000Z"),
            endDate: new Date("2021-04-28T23:30:00.000Z"),
            animation: "foulen ben foulen 9",
            description: "Ceci est un test de description 9",
            image: "formation.jpg"
        }, {          
            id: 10,
            text: "Customer Workshop",
            startDate: new Date("2021-04-29T18:00:00.000Z"),
            endDate: new Date("2021-04-29T19:00:00.000Z"),
            allDay: true,
            animation: "foulen ben foulen 10",
            description: "Ceci est un test de description 10",
            image: "workshop.jpg"
        }, {          
            id: 11,
            text: "Prepare 2021 Marketing Plan",
            startDate: new Date("2021-04-29T18:00:00.000Z"),
            endDate: new Date("2021-04-29T20:30:00.000Z"),
            animation: "foulen ben foulen 11",
            description: "Ceci est un test de description 11",
            image: "formation.jpg"
        }, {
            id: 12,
            text: "Brochure Design Review",
            startDate: new Date("2021-04-29T21:00:00.000Z"),
            endDate: new Date("2021-04-29T22:30:00.000Z"),
            animation: "foulen ben foulen 12",
            description: "Ceci est un test de description 12",
            image: "workshop.jpg"
        }, {          
            id: 13,
            text: "Create Icons for Website",
            startDate: new Date("2021-04-30T17:00:00.000Z"),
            endDate: new Date("2021-04-30T18:30:00.000Z"),
            animation: "foulen ben foulen 13",
            description: "Ceci est un test de description 13",
            image: "workshop.jpg"
        }, {          
            id: 14,
            text: "Upgrade Server Hardware",
            startDate: new Date("2021-04-30T21:30:00.000Z"),
            endDate: new Date("2021-04-30T23:00:00.000Z"),
            animation: "foulen ben foulen 14",
            description: "Ceci est un test de description 14",
            image: "workshop.jpg"
        }, {          
            id: 15,
            text: "Submit New Website Design",
            startDate: new Date("2021-04-30T23:30:00.000Z"),
            endDate: new Date("2021-05-01T01:00:00.000Z"),
            animation: "foulen ben foulen 15",
            description: "Ceci est un test de description 15",
            image: "workshop.jpg"
        }, {          
            id: 16,
            text: "Launch New Website",
            startDate: new Date("2021-04-30T19:20:00.000Z"),
            endDate: new Date("2021-04-30T21:00:00.000Z"),
            animation: "foulen ben foulen 16",
            description: "Ceci est un test de description 16",
            image: "workshop.jpg"
        }
    ];
    this.emitAppointmentsData();
  }


  emitAppointmentsData(): void{
    this.appointmentsDataSubject.next(this.appointmentsData.slice());
  }


} 


