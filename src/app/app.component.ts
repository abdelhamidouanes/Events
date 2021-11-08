import { imgFolder } from './shared/constantes';
import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{
  

  imgFolder = imgFolder;

  loading : boolean;
  loadingSubscription : Subscription;

  constructor(private loadingService: LoadingService){
    this.initGlobalize();
    Globalize.locale(navigator.language);

    this.loading = false;
    this.loadingSubscription = new Subscription();
  }

  initGlobalize() {
      Globalize.load(
          deCldrData,
          ruCldrData,
          supplemental
      );
  }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe(data => {
      this.loading = data;
    });
    this.loadingService.emitLoading();
  }

}
