import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isOpen: boolean[];

  constructor() { 
    this.isOpen = [];
  }

  ngOnInit(): void {
    this.isOpen = [false,false,false,false,false,false]
  }

  openCloseMenu(index: number): void{
    this.isOpen[index]= !this.isOpen[index];
    this.isOpen.forEach((element,i) => {
      if(i!= index){
        this.isOpen[i] = false;
      }
    });
  }

}
