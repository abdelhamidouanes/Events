import { LoadingService } from './loading.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Integer from '@zxing/library/esm/core/util/Integer';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private connected : boolean;
  connectedSubject: Subject<boolean>;

  private token: string;
  tokenSubject : Subject<string>;

  private username: string;
  private category_id: Integer;
  usernameSubject : Subject<string>;
  category_idSubject : Subject<Integer>;

  apiLink = environment.apiLink;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private loadingService: LoadingService) {
    this.connected = false;
    this.connectedSubject = new Subject<boolean>();
    this.token = '';
    this.tokenSubject = new Subject<string>();
    this.username = '';
    this.category_id = 0;
    this.usernameSubject = new Subject<string>();
    this.category_idSubject = new Subject<Integer>();
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
        this.category_id = data.category_id;
        this.emitUsername();
        this.emitCategoryId();
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

  emitCategoryId(): void{
    this.category_idSubject.next(this.category_id);
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
    this.emitCategoryId();
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
      this.emitCategoryId();
      return true;  
    } catch (error) {
      console.log('erreur deconnexion '+ error);
      return false;
    }
  }

  async createAccount(username: string, name:string, pw: string, pwconfirmation: string): Promise<boolean>{
    try {
      let headers= new HttpHeaders({ 'Authorization': 'Bearer 3|X74aa13ooP9wkFQPtPr8XLkzAnLlUiCog1IqkJAm'});
      const body = {
        'username': username,
        'name': name,
        'password_confirmation': pwconfirmation,
        'password': pw
      };
      const data : any = await this.httpClient.post<any[]>(this.apiLink+'auth/register', body, { headers }).toPromise();
      this.connected = true;
      this.token = data.access_token;
      this.username = username;
      this.cookieService.set('tok', this.token);
      this.emitConnected();
      this.emitToken();
      this.emitCategoryId();
      return true;  
    } catch (error) {
      console.log('erreur creation compte '+ error);
      return false;
    }
  }

}
