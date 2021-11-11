import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private isOpen: boolean[];
  isOpenSubject: Subject<boolean[]>;

  private isOpenResMenu : boolean;
  isOpenResMenuSubject: Subject<boolean>;

  constructor(private router: Router) { 
    this.isOpen = [false,false,false,false,false,false,false];
    this.isOpenSubject = new Subject<boolean[]>();
    this.isOpenResMenu = false;
    this.isOpenResMenuSubject = new Subject<boolean>();
  }

  emitIsOpenSubject(): void{
    this.isOpenSubject.next(this.isOpen.slice());
  }
  
  emitIsOpenResMenu(): void{
    this.isOpenResMenuSubject.next(this.isOpenResMenu);
  }

  openCloseIsOpenResMenu(): void{
    this.isOpenResMenu = !this.isOpenResMenu;
    this.emitIsOpenResMenu();
  }

  closeIsOpenResMenu(): void{
    this.isOpenResMenu = false;
    this.emitIsOpenResMenu();
  }

  updateIsOpen(index: number): void{
    this.isOpen[index]= true;
    this.isOpen.forEach((element,i) => {
      if(i!= index){
        this.isOpen[i] = false;
      }
    });
    this.emitIsOpenSubject();
  }

}
