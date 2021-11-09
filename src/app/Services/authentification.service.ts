import { LoadingService } from './loading.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private connected : boolean;
  connectedSubject: Subject<boolean>;

  private token: string;
  tokenSubject : Subject<string>;

  private username: string;
  usernameSubject : Subject<string>;

  apiLink = environment.apiLink;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private loadingService: LoadingService) {
    this.connected = false;
    this.connectedSubject = new Subject<boolean>();
    this.token = '';
    this.tokenSubject = new Subject<string>();
    this.username = '';
    this.usernameSubject = new Subject<string>();
    
    this.emitConnected();
  }

  async getConnectionStatus(): Promise<boolean>{
    this.loadingService.displayLoading();
    if(this.cookieService.get('tok')==null){
      return false;
    }else{
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const body = {};
      try {
        const data: any = await this.httpClient.post<any[]>(this.apiLink+'auth/me', body, { headers }).toPromise();
        this.connected = true;
        this.token = this.cookieService.get('tok');
        this.username = data.username;
        this.emitUsername();
        this.emitToken();
        this.emitConnected();
        this.loadingService.unDisplayLoading();
        return true;
      } catch (error) {
        this.loadingService.unDisplayLoading();
        return false;
      }
        
    }
  }


  emitConnected(): void{
    this.connectedSubject.next(this.connected);
  }

  emitToken(): void{
    this.tokenSubject.next(this.token);
  }

  emitUsername(): void{
    this.usernameSubject.next(this.username);
  }

  async connect(email: string, password: string): Promise<boolean>{
    const httpBody = {'username' : email, 'password' : password};
    try {
      const data : any = await this.httpClient.post<any[]>(this.apiLink+'auth/login', httpBody).toPromise();
      this.connected = true;
      this.token = data.access_token;
      this.username = email;
      this.cookieService.set('tok', this.token);
    } catch (error) {
      this.connected = false;
      console.log('erreur connexion '+ error + ' connected '+this.connected);
    }
    this.emitConnected();
    this.emitToken();
    this.emitUsername();
    return this.connected;
  }

  async disconnect():Promise<boolean>{
    try {
      let headers= new HttpHeaders({ 'Authorization': 'Bearer '+this.cookieService.get('tok')});
      const body = {};
      const data : any = await this.httpClient.post<any[]>(this.apiLink+'auth/logout', body, { headers }).toPromise();
      this.cookieService.delete('tok');
      this.username = '';
      this.connected = false;
      this.token = '';
      this.emitConnected();
      this.emitToken();
      this.emitUsername();
      return true;  
    } catch (error) {
      console.log('erreur deconnexion '+ error);
      return false;
    }
  }

}
