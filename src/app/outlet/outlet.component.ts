import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  displayHeader(): boolean{
    console.log();
    return ['/signIn','/signUp'].includes(this.router.url)?false: true;
  }

}
