import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  
  apiLink = environment.apiLink;

  private reclamations: any[];
  reclamationSubject : Subject<any[]>;

  constructor(private cookieService: CookieService, 
              private loadingService: LoadingService,
              private httpClient: HttpClient) {
            this.reclamations=[];
            this.reclamationSubject = new Subject<any[]>();    
  }


  async submitReclamtion(reclamation: string): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const httpBody = {'content' : reclamation};
      try {
        const data: any = await this.httpClient.post<any[]>(this.apiLink+'reclamations', httpBody, { headers }).toPromise();
        const getReclamations: boolean = await this.getListeReclamation();
        this.loadingService.unDisplayLoading();
        return getReclamations;
      } catch (error: any) {
          this.loadingService.unDisplayLoading();
          return false;
      }
    }
  }

  async getListeReclamation(): Promise<boolean>{
    // this.loadingService.displayLoading();
    // let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
    // try {
    //   const data: any = await this.httpClient.get<any[]>(this.apiLink+'reclamations', { headers }).toPromise();
    //   data.data.forEach((element:any, index: any) => {
    //     this.reclamations[index]= data.data.content;
    //   });
    //   this.emitReclamation();
    //   this.loadingService.unDisplayLoading();
    //   return true;
    // } catch (error: any) {
    //     this.loadingService.unDisplayLoading();
    //     return false;
    // }
    this.reclamations =  ['test','test2'];
    this.emitReclamation();
    return true;
  }

  emitReclamation(): void{
    this.reclamationSubject.next(this.reclamations.slice());
  }

}
