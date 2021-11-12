import { MenuService } from './../Services/menu.service';
import { PopUpServiceService } from './../Services/pop-up-service.service';
import { LoadingService } from './../Services/loading.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service';
import { PresenceService } from '../Services/presence.service';
import { Subscription } from 'rxjs';
import { imgFolder } from '../shared/constantes';
import Integer from '@zxing/library/esm/core/util/Integer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  
  imgFolder= imgFolder;
  isOpen: boolean[];
  isOpenSubscription: Subscription;
  username: string;
  usernameSubscription: Subscription;
  category_id: Integer;
  category_idSubscription: Subscription;
  windowWidth: any;
  windowHeight: any;
  isOpenResMenu : boolean;
  isOpenResMenuSubscription: Subscription;

  constructor(private loadingService: LoadingService, 
              private popUpServiceService: PopUpServiceService,
              private router: Router,
              private authentificationService: AuthentificationService,
              private presenceService: PresenceService,
              private menuService: MenuService) {
    this.isOpen = [];
    this.isOpenSubscription = new Subscription();
    this.username = '';
    this.usernameSubscription = new Subscription();
    this.category_id = '';
    this.category_idSubscription = new Subscription();
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.isOpenResMenu = false;
    this.isOpenResMenuSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.isOpenSubscription.unsubscribe();
    this.usernameSubscription.unsubscribe();
    this.category_idSubscription.unsubscribe();
    this.isOpenResMenuSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.usernameSubscription = this.authentificationService.usernameSubject.subscribe(data => {
      this.username = data;
    });
    this.category_idSubscription = this.authentificationService.category_idSubject.subscribe(data => {
      this.category_id = data;
    });
    this.authentificationService.emitUsername();
    this.authentificationService.emitCategoryId();

    this.isOpenSubscription = this.menuService.isOpenSubject.subscribe(data => {
      this.isOpen = data;
    });
    this.menuService.emitIsOpenSubject();
    
    this.isOpenResMenuSubscription = this.menuService.isOpenResMenuSubject.subscribe(data => {
      this.isOpenResMenu = data;
    });
    this.menuService.emitIsOpenResMenu();

  }

  async itemClick(item: any): Promise<void> {
    if(item != null){
        this.loadingService.displayLoading();
        if(item=='monqrcode'){
          this.router.navigate(['/myQrCode']);
          this.loadingService.unDisplayLoading();
        }
        if(item=='agenda'){
          this.router.navigate(['/agenda']);
          this.loadingService.unDisplayLoading();
        }
        if(item=='deconnexion'){
          this.loadingService.displayLoading();
          const disconnect = await this.authentificationService.disconnect();
          if(!disconnect){
            this.popUpServiceService.setBigTitle('خطأ أثناء تسجيل الخروج ')
            this.popUpServiceService.setTitle('خطأ أثناء تسجيل الخروج ');
            this.popUpServiceService.setMsg('تسجيل الخروج غير ممكن');
            this.popUpServiceService.displayPopUp();
            this.loadingService.unDisplayLoading();
          }
          else{
            this.router.navigate(['/signIn']);
            this.loadingService.unDisplayLoading();
          }
        }
        if(item=='changementpw'){
          this.router.navigate(['/changepw']);
          this.loadingService.unDisplayLoading();
        }
        if(item=='presence'){
          this.presenceService.initCurrentSession();
          this.presenceService.initAllAttendance();
          this.router.navigate(['/attendance']);
          this.loadingService.unDisplayLoading();
        }
        if(item=='reclamation'){
          this.router.navigate(['/reclamation']);
          this.loadingService.unDisplayLoading();
        }
        if(item=='programme'){
          this.router.navigate(['/']);
          this.loadingService.unDisplayLoading();
        }
      this.menuService.closeIsOpenResMenu();  
    }
  }

    
  updateIsOpen(): boolean{
    let index: number= 0;
    if(this.router.url=='/'){
      index = 0;
    }else if(this.router.url=='/agenda'){
      index = 1;
    }else if(this.router.url=='/myQrCode'){
      index = 2;
    }else if(this.router.url=='/reclamation'){
      index = 3;
    }else if(this.router.url=='/changepw'){
      index = 4;
    }else if(this.router.url=='/attendance'){
      index = 6;
    }
    this.menuService.updateIsOpen(index);
    return true;
  }

  @HostListener('window:resize', ['$event'])
  onResizeWindow(event: any) {
   this.windowHeight = window.innerHeight;
   this.windowWidth = window.innerWidth;
   if(this.windowWidth>=1300){
     this.menuService.closeIsOpenResMenu();
   }
  }

  openCloseResMenu(): void{
    this.menuService.openCloseIsOpenResMenu();
  }

}
