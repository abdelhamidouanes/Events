import { Router } from '@angular/router';
import { PopUpServiceService } from './../Services/pop-up-service.service';
import { PresenceService } from './../Services/presence.service';
import { LoadingService } from './../Services/loading.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-changementpw',
  templateUrl: './changementpw.component.html',
  styleUrls: ['./changementpw.component.css']
})
export class ChangementpwComponent implements OnInit {

  constructor(private loadingService: LoadingService, 
              private presenceService : PresenceService,
              private popUpServiceService : PopUpServiceService,
              private router: Router) { }

  ngOnInit(): void {
  }


  async onSubmit(form: NgForm){
    this.loadingService.displayLoading();
    const password = form.value['password']; 
    const passwordc = form.value['passwordc']; 
    const changePw = await this.presenceService.changePassWord(password, passwordc);
    if(changePw){
      this.popUpServiceService.setBigTitle('تم تغيير كلمة السر بنجاح')
      this.popUpServiceService.setTitle('تم الارسال بنجاح');
      this.popUpServiceService.setMsg('لقد تم تغيير كلمة السر خاصتكم بنجاح');
      this.popUpServiceService.displayPopUp();
      this.loadingService.unDisplayLoading();
      this.router.navigate(['/']);
    }else{
      this.popUpServiceService.setBigTitle('خطأ أثناء تغيير كلمة السر ')
      this.popUpServiceService.setTitle('تغيير كلمة السر غير ممكن');
      this.popUpServiceService.setMsg('الرجاء التثبت من المعطيات المدخلة');
      this.popUpServiceService.displayPopUp();
      this.loadingService.unDisplayLoading();
    }
  } 

}
