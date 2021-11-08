import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpServiceService {

  private displayed : boolean;
  displayedSubject : Subject<boolean>;
  

  private title : string;
  titleSubject : Subject<string>;
  
  private msg : string;
  msgSubject : Subject<string>;

  constructor() { 
    this.displayed = false;
    this.displayedSubject = new Subject<boolean>();
    this.emitDisplayed();

    this.title = '';
    this.titleSubject = new Subject<string>();
    this.emitTitle();

    this.msg = '';
    this.msgSubject = new Subject<string>();
    this.emitMsg();
  }

  emitDisplayed(): void{
    this.displayedSubject.next(this.displayed);
  }

  emitTitle(): void{
    this.titleSubject.next(this.title);
  }

  emitMsg(): void{
    this.msgSubject.next(this.msg);
  }

  displayPopUp(): void{
    this.displayed = true;
    this.emitDisplayed();
  }

  unDisplayPopUp():void{
    this.displayed = false;
    this.emitDisplayed();
  }

  setTitle(title: string): void{
    this.title = title;
    this.emitTitle();
  }

  setMsg(msg: string): void{
    this.msg = msg;
    this.emitMsg();
  }

}
