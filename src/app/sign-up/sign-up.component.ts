import { CookieService } from 'ngx-cookie-service';
import { PopUpServiceService } from './../Services/pop-up-service.service';
import { LoadingService } from './../Services/loading.service';
import { AuthentificationService } from './../Services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authentificationService : AuthentificationService,
              private loadingService: LoadingService,
              private popUpServiceService: PopUpServiceService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('tok')!='' && this.cookieService.get('tok')!=null){
      this.router.navigate(['/']);
    }
  }

  async onCreateAccount(form: NgForm):Promise<void>{
    this.loadingService.displayLoading();
    const email = form.value['email']; 
    const password = form.value['password'];
    const passwordc = form.value['passwordc'];
    const nom = form.value['nom'];

    const successCreateAccount = await this.authentificationService.createAccount(email,nom,password,passwordc);

    if(!successCreateAccount){
      this.popUpServiceService.setBigTitle('خطأ في إنشاء الحساب');
      this.popUpServiceService.setTitle('خطأ عند إنشاء حساب جديد');
      this.popUpServiceService.setMsg('يرجى التحقق من المعلومات التي تم إدخالها');
      this.popUpServiceService.displayPopUp();
    }else{
      this.popUpServiceService.setBigTitle('تم إنشاء الحساب بنجاح');
      this.popUpServiceService.setTitle('مرحبا');
      this.popUpServiceService.setMsg('تم إنشاء حسابك بنجاح');
      this.popUpServiceService.displayPopUp();
      this.router.navigate(['/']);
    }
    this.loadingService.unDisplayLoading();
  }
}
