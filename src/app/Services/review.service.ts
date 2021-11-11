import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiLink = environment.apiLink;
  
  private displayed : boolean;
  displayedSubject : Subject<boolean>;

  private session: any;
  sessionSubject: Subject<any>;


  private note: any;
  noteSubject : Subject<any>;

  private observation: any;
  observationSubject : Subject<any>;

  constructor(private loadingService: LoadingService, 
              private cookieService: CookieService,
              private httpClient: HttpClient) { 
    this.displayed = false;
    this.displayedSubject = new Subject<boolean>();
    this.emitDisplayed();

    this.sessionSubject = new Subject<any>();

    this.noteSubject = new Subject<any>();
    this.emitNote();

    this.observation='تقييم';
    this.observationSubject = new Subject<any>();
    this.emitObservation();
  }


  emitDisplayed(): void{
    this.displayedSubject.next(this.displayed);
  }

  emitSession(): void{
    this.sessionSubject.next(this.session);
  }

  emitNote(): void{
    this.noteSubject.next(this.note);
  }

  emitObservation(): void{
    this.observationSubject.next(this.observation);
  }

  displayPopUp(): void{
    this.displayed = true;
    this.emitDisplayed();
  }

  unDisplayPopUp():void{
    this.displayed = false;
    this.emitDisplayed();
  }

  setSession(session: any): void{
    this.session = session;
    this.emitSession();
  }


  initNoteObservation(): void{
    this.note = 0;
    this.emitNote();
    this.observation  = 'تقييم';
    this.emitObservation();
  }

  async getReview(): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      try {
        const data: any = await this.httpClient.get<any[]>(this.apiLink+'reviews/'+this.session.id, { headers }).toPromise();
        this.note = data.data.value;
        this.observation = data.data.content==null?'تقييم':data.data.content;
        this.emitNote();
        this.emitObservation();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error: any) {
        if(error.error.message=='there is no review for his session'){
          this.loadingService.unDisplayLoading();
          return true;
        }else{
          this.loadingService.unDisplayLoading();
          return false;
        }
      }
    }
  }

  async submitReview(value:number, content: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const httpBody = {'value' : value, 'content' : content};
      try {
        const data: any = await this.httpClient.post<any[]>(this.apiLink+'reviews/'+this.session.id, httpBody, { headers }).toPromise();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error: any) {
          this.loadingService.unDisplayLoading();
          return false;
      }
    }
  }
  

}
