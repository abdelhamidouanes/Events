import { PresenceService } from './../Services/presence.service';
import { PopUpServiceService } from './../Services/pop-up-service.service';
import { AuthentificationService } from './../Services/authentification.service';
import { LoadingService } from './../Services/loading.service';
import { Component, OnInit } from '@angular/core';
import { imgFolder } from '../shared/constantes';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  imgFolder= imgFolder;
  topBar: any[];

  username: string;
  usernameSubscription: Subscription;


  constructor(private loadingService: LoadingService,
              private router: Router,
              private authentificationService: AuthentificationService,
              private popUpServiceService: PopUpServiceService,
              private presenceService: PresenceService) { 
    this.topBar = [];
    this.username = '';
    this.usernameSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.usernameSubscription = this.authentificationService.usernameSubject.subscribe(data => {
      this.username = data;
      if(this.username == 'admin'){
        this.topBar = [{
          id: "1",
          name: "Agenda",
          items: [],
          type : 'agenda'
      }, {
          id: "2",
          name: "Votes",
          items: [
            {
              name: 'Mes votes',
              type: 'mesvotes'
            },
            {
              name: 'Voter',
              type: 'voter'
            }
          ]
      }, {
          id: "3",
          name: "Propositions et réclamations",
          items: [
            {
              name: 'Proposer',
              type: 'proposer'
            },
            {
              name: 'Réclamer',
              type: 'reclamer'
            },
            {
              name: 'Mes propositions et réclamations',
              type: 'mespropositionsreclamation'
            }
          ]
      }, {
          id: "4",
          name: "Mon QR code",
          items: [],
          type : 'monqrcode'
      }, {
          id: "5",
          name: "Mon compte",
          items: [
            {
              name: 'Changer mot de passe',
              type: 'changermotdepasse'
            },
            {
              name: 'Déconnexion',
              type: 'deconnexion'
            }
          ]
      },{
        id: "6",
        name: "Présence",
        items: [],
        type : 'presence'
      }
    ];
      }else{
        this.topBar = [{
          id: "1",
          name: "Agenda",
          items: [],
          type : 'agenda'
      }, {
          id: "2",
          name: "Votes",
          items: [
            {
              name: 'Mes votes',
              type: 'mesvotes'
            },
            {
              name: 'Voter',
              type: 'voter'
            }
          ]
      }, {
          id: "3",
          name: "Propositions et réclamations",
          items: [
            {
              name: 'Proposer',
              type: 'proposer'
            },
            {
              name: 'Réclamer',
              type: 'reclamer'
            },
            {
              name: 'Mes propositions et réclamations',
              type: 'mespropositionsreclamation'
            }
          ]
      }, {
          id: "4",
          name: "Mon QR code",
          items: [],
          type : 'monqrcode'
      }, {
          id: "5",
          name: "Mon compte",
          items: [
            {
              name: 'Changer mot de passe',
              type: 'changermotdepasse'
            },
            {
              name: 'Déconnexion',
              type: 'deconnexion'
            }
          ]
      }];
      }
    });
    this.authentificationService.emitUsername();
  }

  async itemClick(data: any): Promise<void> {
    let item = data.itemData;
    if(item.type != null){
        this.loadingService.displayLoading();
        if(item.type=='monqrcode'){
          this.router.navigate(['/myQrCode']);
          this.loadingService.unDisplayLoading();
        }
        if(item.type=='agenda'){
          this.router.navigate(['/']);
          this.loadingService.unDisplayLoading();
        }
        if(item.type=='deconnexion'){
          this.loadingService.displayLoading();
          const disconnect = await this.authentificationService.disconnect();
          if(!disconnect){
            this.popUpServiceService.setTitle('Erreur déconnexion.');
            this.popUpServiceService.setMsg('Déconnexion impossible.');
            this.popUpServiceService.displayPopUp();
            this.loadingService.unDisplayLoading();
          }
          else{
            this.router.navigate(['/signIn']);
            this.loadingService.unDisplayLoading();
          }
        }
        if(item.type=='presence'){
          this.presenceService.initCurrentSession();
          this.presenceService.initAllAttendance();
          this.router.navigate(['/attendance']);
          this.loadingService.unDisplayLoading();
        }
    }
  }

}
