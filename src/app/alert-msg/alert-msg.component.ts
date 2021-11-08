import { Component, Input, OnInit } from '@angular/core';
import { PopUpServiceService } from '../Services/pop-up-service.service';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {

  @Input() title= '';
  @Input() msg= ''; 



  constructor(private popUpServiceService: PopUpServiceService) { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.popUpServiceService.unDisplayPopUp();
  } 


}
