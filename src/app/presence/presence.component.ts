import { PopUpServiceService } from './../Services/pop-up-service.service';
import { PresenceService } from './../Services/presence.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit, OnDestroy {
 
  response : string;
  allSession : any[];
  allSessionSubscription : Subscription;
  successAttendance : boolean;

  allAttendance : any[];
  allAttendanceSubscription : Subscription;

  currentSession: string;
  currentSessionSubscription: Subscription;

  loadingScanAddQRcode: boolean;

  constructor(private presenceService: PresenceService, private popUpServiceService: PopUpServiceService) { 
    this.response = '';
    this.allSession = [];
    this.allSessionSubscription = new Subscription();
    this.allAttendance = [];
    this.allAttendanceSubscription = new Subscription();
    this.successAttendance = false;
    this.currentSession = '';
    this.currentSessionSubscription = new Subscription();
    this.loadingScanAddQRcode = false;
  }

  ngOnDestroy(): void {
    this.allSessionSubscription.unsubscribe();
    this.allAttendanceSubscription.unsubscribe();
    this.currentSessionSubscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {

    if(!await this.presenceService.getAllSessions()){
      this.popUpServiceService.setTitle('Erreur chargement des sessions');
      this.popUpServiceService.setMsg('La liste des sessions n\'a pas pu être chargée');
      this.popUpServiceService.displayPopUp();
    }

    this.allSessionSubscription = this.presenceService.allSessionSubject.subscribe(data=> {
      this.allSession = data;
    });
    this.presenceService.emitAllSessions();

    this.allAttendanceSubscription = this.presenceService.allAttendanceSubject.subscribe(data=> {
      this.allAttendance = data;
    });
    this.presenceService.emitAllAttendance();

    this.currentSessionSubscription = this.presenceService.currentSessionSubject.subscribe(data => {
      this.currentSession = data;
    });
    this.presenceService.emitCurrentSession();

  }

  async scanSuccessHandler(qrcode: any):Promise<void> {
    if(!this.loadingScanAddQRcode){
        this.loadingScanAddQRcode = true;
        if(this.currentSession==''){
          this.popUpServiceService.setTitle('Ajout d\'une nouvelle présence impossible');
          this.popUpServiceService.setMsg('Veuillez selectionner une session.');
          this.popUpServiceService.displayPopUp();
        }else{
          if(!await this.presenceService.addNewAttendance(this.currentSession, qrcode)){
            this.popUpServiceService.setTitle('Erreur ajout de présence');
            this.popUpServiceService.setMsg('Erreur d\'ajout ou de chargement de la liste des présent.');
            this.popUpServiceService.displayPopUp();
            this.successAttendance = false;
            this.response = 'Echec lors de l\'ajout de la nouvelle présence';
            setTimeout(() => {
              this.response ='';
            }, 5000);
          }else{
            this.successAttendance = true;
            this.response = 'Ajout effectué avec succés de '+qrcode+'.';
            setTimeout(() => {
              this.response ='';
            }, 5000);
          }
        }
        this.loadingScanAddQRcode = false;
    }
  }

  async onSelectionChanged(session : any):Promise<void>{
    this.presenceService.setCurrentSession(session[0].id);
    if(!await this.presenceService.getAllAttendance(session[0].id)){
      this.popUpServiceService.setTitle('Erreur chargement des présence');
      this.popUpServiceService.setMsg('La liste des présences n\'a pas pu être chargée');
      this.popUpServiceService.displayPopUp();
    }
  }

  async onAddQRCodeText(form: NgForm){
    const qrcode = form.value['qrcode-text']; 
    if(!this.loadingScanAddQRcode){
      this.loadingScanAddQRcode = true;
      if(qrcode=='' || this.currentSession==''){
        this.popUpServiceService.setTitle('Ajout d\'une nouvelle présence impossible');
        this.popUpServiceService.setMsg('Veuillez selectionner une session et saisir le nom d\'utilisateur.');
        this.popUpServiceService.displayPopUp();
      }else{
        if(!await this.presenceService.addNewAttendance(this.currentSession, qrcode)){
          this.popUpServiceService.setTitle('Erreur ajout de présence');
          this.popUpServiceService.setMsg('Erreur d\'ajout ou de chargement de la liste des présent.');
          this.popUpServiceService.displayPopUp();
          this.successAttendance = false;
          this.response = 'Echec lors de l\'ajout de la nouvelle présence';
          setTimeout(() => {
            this.response ='';
          }, 5000);
        }else{
          this.successAttendance = true;
          this.response = 'Ajout effectué avec succés de '+qrcode+'.';
          setTimeout(() => {
            this.response ='';
          }, 5000);
        }
      }
      this.loadingScanAddQRcode = false;
    }
  }

  emptyAllAttendance(): boolean{
    return this.allAttendance.length ==0 ;
  }

}
