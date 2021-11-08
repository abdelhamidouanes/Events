import { LoadingService } from './../Services/loading.service';
import { Component, OnInit } from '@angular/core';
import { imgFolder } from '../shared/constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  imgFolder= imgFolder;
  topBar: any[];

  constructor(private loadingService: LoadingService) { 
    this.topBar = [];
  }

  ngOnInit(): void {
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

  itemClick(data: any): void {
    let item = data.itemData;
    if(item.type != null){
        this.loadingService.displayLoading();
    }
  }

}
