import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { imgFolder } from '../shared/constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  imgFolder= imgFolder;
  windowWidth: any;

  constructor(private router: Router) { 
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
  }

  
  @HostListener('window:resize', ['$event'])
  onResizeWindow(event: any) {
   this.windowWidth = window.innerWidth;
  }

  displayMenu(): boolean{
    if(['/signIn','/signUp'].includes(this.router.url)){
      return false;
    }
    else{
      return true;
    }
  }
}
