import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  
  constructor( private authentificationService: AuthentificationService,
               private router: Router) { 

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    this.authentificationService.getConnectionStatus().then(data =>{
      if(data==false){
        this.router.navigate(['/signIn']);
      }
    });
    return this.authentificationService.getConnectionStatus();
  }
}
