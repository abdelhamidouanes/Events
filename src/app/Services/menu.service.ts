import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private isOpen: boolean[];

  constructor() { 
    this.isOpen = [false,false,false,false,false,false]
  }
}
