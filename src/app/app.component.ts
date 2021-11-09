import { PopUpServiceService } from './Services/pop-up-service.service';
import { imgFolder } from './shared/constantes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './Services/loading.service';
import supplemental from "devextreme-cldr-data/supplemental.json";
import deCldrData from "devextreme-cldr-data/de.json";
import ruCldrData from "devextreme-cldr-data/ru.json";
 
import Globalize from "globalize";

import deMessages from "devextreme/localization/messages/de.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  

  imgFolder = imgFolder;

  loading : boolean;
  loadingSubscription : Subscription;

  displayed : boolean;
  displayedSubscription : Subscription;

  constructor(private loadingService: LoadingService, private popUpServiceService: PopUpServiceService){

    this.loading = false;
    this.loadingSubscription = new Subscription();

    this.displayed = false;
    this.displayedSubscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.displayedSubscription.unsubscribe();
    this.displayedSubscription.unsubscribe();
  }


  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe(data => {
      this.loading = data;
    });
    this.loadingService.emitLoading();

    this.displayedSubscription = this.popUpServiceService.displayedSubject.subscribe(data => {
      this.displayed = data;
    });
    this.popUpServiceService.emitDisplayed();
  }

}
