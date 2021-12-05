import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  apiLink = environment.apiLink;
  private allSession : any[];
  allSessionSubject : Subject<any>;


  private allAttendance : any[];
  allAttendanceSubject : Subject<any>;

  private currentSession: string;
  currentSessionSubject: Subject<string>;

  private currentSessionName: string;
  currentSessionNameSubject: Subject<string>;

  constructor(private loadingService: LoadingService, private cookieService: CookieService, private httpClient: HttpClient) { 
    this.allSession = [];
    this.allAttendance = [];
    this.allSessionSubject = new Subject<any>();
    this.allAttendanceSubject = new Subject<any>();
    this.currentSession = '';
    this.currentSessionSubject = new Subject<string>();
    this.currentSessionName = '';
    this.currentSessionNameSubject = new Subject<string>();
  }

  emitAllSessions(): void{
    this.allSessionSubject.next(this.allSession);
  }


  emitAllAttendance(): void{
    this.allAttendanceSubject.next(this.allAttendance);
  }


  initAllAttendance(): void{
    this.allAttendance = [];
    this.emitAllAttendance();
  }

  emitCurrentSession(): void{
    this.currentSessionSubject.next(this.currentSession);
  }

  emitCurrentSessionName(): void{
    this.currentSessionNameSubject.next(this.currentSessionName);
  }

  setCurrentSession(newSession: string): void{
    this.currentSession = newSession;
    this.emitCurrentSession();
  }

  initCurrentSession(): void{
    this.currentSession = '';
    this.emitCurrentSession();
  }

  setCurrentSessionName(newSessionName: string): void{
    this.currentSessionName = newSessionName;
    this.emitCurrentSessionName();
  }

  initCurrentSessionName(): void{
    this.currentSessionName = '';
    this.emitCurrentSessionName();
  }

  async getAllSessions(): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      try {
        const data: any = await this.httpClient.get<any[]>(this.apiLink+'sessions/all', { headers }).toPromise();
        this.allSession = data.data;
        this.emitAllSessions();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
    }
  }

  async getAllAttendance(sessionId: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      try {
        const data: any = await this.httpClient.get<any[]>(this.apiLink+'attendance/'+sessionId, { headers }).toPromise();
        this.allAttendance = data.data;
        this.emitAllAttendance();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
    }
  }

  async deleteInvitedAttendance(sessionId: string, invitedUserName: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      const body = {};
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      try {
        await this.httpClient.put<any[]>(this.apiLink+'attendance/'+sessionId+'/user/'+invitedUserName, body, { headers }).toPromise();
        await this.getAllAttendance(sessionId);
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
    }
  }
  
  async getAllAttendanceWithoutLoading(sessionId: string): Promise<boolean>{
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      try {
        const data: any = await this.httpClient.get<any[]>(this.apiLink+'attendance/'+sessionId, { headers }).toPromise();
        this.allAttendance = data.data;
        this.emitAllAttendance();
        return true;
      } catch (error) {
        return false;
      }
    }
  }
  
  async addNewAttendance(sessionId: string, username: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const body = {};
      try {
        const data: any = await this.httpClient.post<any[]>(this.apiLink+'attendance/'+sessionId+'/user/'+username, body, { headers }).toPromise();
        const getAttendance: boolean = await this.getAllAttendanceWithoutLoading(sessionId);
        this.loadingService.unDisplayLoading();
        return getAttendance;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
    }
  }

  async changePassWord(pw: string, pwc: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const body = {'password_confirmation': pwc, 'password': pw};
      try {
        const data: any = await this.httpClient.post<any[]>(this.apiLink+'auth/profile/password', body, { headers }).toPromise();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
    }
  }

}
