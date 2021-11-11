import { imgFolder } from './../shared/constantes';
import { LoadingService } from './../Services/loading.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../Services/authentification.service';
import { Router } from '@angular/router';
import { PopUpServiceService } from '../Services/pop-up-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  imgFolder = imgFolder;

  constructor(private loadingService: LoadingService,
              private authentificationService: AuthentificationService,
              private router: Router,
              private popUpServiceService: PopUpServiceService,
              private cookieService: CookieService) { }


  ngOnInit(): void {
    if(this.cookieService.get('tok')!='' && this.cookieService.get('tok')!=null){
      this.router.navigate(['/']);
    }
  }


  async onSubmit(form: NgForm){
    this.loadingService.displayLoading();
    const email = form.value['email']; 
    const password = form.value['password']; 
    let connected : boolean = await this.authentificationService.connect(email, password);
    if(connected){
      this.router.navigate(['/']);
      this.loadingService.unDisplayLoading();
    }else{
      this.popUpServiceService.setBigTitle('خطأ أثناء تسجيل الدخول')
      this.popUpServiceService.setTitle('خطأ في الإتصال');
      this.popUpServiceService.setMsg('اسم المستخدم أو كلمة المرور غير صحيحة');
      this.popUpServiceService.displayPopUp();
      this.loadingService.unDisplayLoading();
    }
  } 

  onCreateAccount(): void{
    this.router.navigate(['/signUp']);
    this.loadingService.unDisplayLoading();
  }

}
