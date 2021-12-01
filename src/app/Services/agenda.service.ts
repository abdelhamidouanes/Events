import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  apiLink = environment.apiLink
  private appointmentsData: any[];
  appointmentsDataSubject : Subject<any[]>;
  
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { 
    this.appointmentsData = [];
    this.appointmentsDataSubject = new Subject<any[]>();
  }

  async getAppointmentsData(): Promise<void>{
    const headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
    const data: any = await this.httpClient.get<any[]>(this.apiLink+'sessions', { headers }).toPromise();
    data.data.forEach((element: any, index: any) => {
        console.log(typeof element.start);
        this.appointmentsData[index] = {
            'title': element.name,
            'start': element.start,
            'end': element.end,
            'color': '#ff6d42'
        }
    });                        
    this.emitAppointmentsData();
  }


  emitAppointmentsData(): void{
    this.appointmentsDataSubject.next(this.appointmentsData.slice());
  }


} 


