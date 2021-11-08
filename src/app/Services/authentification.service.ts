import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private connected : boolean;
  connectedSubject: Subject<boolean>;

  apiLink = environment.apiLink;

  constructor(private httpClient: HttpClient) {
    this.connected = false;
    this.connectedSubject = new Subject();
    //Check if conneccted
    this.emitConnected();
  }

  getConnectionStatus(): boolean{
    //update connexion status
    return this.connected;
  }

  isConnected(): boolean{
    return false;//update connexion status
  }


  emitConnected(): void{
    this.connectedSubject.next(this.connected);
  }

  async connect(email: string, password: string): Promise<boolean>{
    const httpBody = {'username' : email, 'password' : password};
    const data: any = await this.httpClient.post<any[]>(this.apiLink+'auth/login', httpBody).toPromise();
    console.log(data.status)
    if(data.error != null){
      console.log('test data error')
      this.connected = false;
    }
    else{
      this.connected = true;
    }
    this.emitConnected();
    return this.connected;
  }

}
