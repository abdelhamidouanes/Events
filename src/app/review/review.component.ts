import { PopUpServiceService } from './../Services/pop-up-service.service';
import { ReviewService } from './../Services/review.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {


  session: any;
  sessionSubscription : Subscription;

  note: any;
  noteSubscription: Subscription;


  observation: any;
  observationSubscription : Subscription;


  constructor(private reviewService: ReviewService,
              private popUpServiceService: PopUpServiceService) { 
    this.sessionSubscription = new Subscription();
    this.noteSubscription = new Subscription();
    this.observationSubscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.sessionSubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.observationSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sessionSubscription = this.reviewService.sessionSubject.subscribe(data => {
      this.session = data;
    });
    this.reviewService.emitSession();
    
    this.noteSubscription = this.reviewService.noteSubject.subscribe(data => {
      this.note = data;
    });
    this.reviewService.emitNote();

    this.observationSubscription = this.reviewService.observationSubject.subscribe(data => {
      this.observation = data;
    });
    this.reviewService.emitObservation();
  }


  onClick(): void{
    this.reviewService.unDisplayPopUp();
  } 

  onStarClick(note: number){
    this.note = note;
  }
  
  async onSubmitReview(form: NgForm){
    const observation = form.value['observation'];
    if(this.note==0){
      this.popUpServiceService.setBigTitle('خطأ أثناء التقييم')
      this.popUpServiceService.setTitle('يرجى تقييم هذه الجلسة');
      this.popUpServiceService.setMsg('إضغط على نجمة لتحديد تقييم بين واحد و خمسة');
      this.popUpServiceService.displayPopUp();
    }else{
      const submitReview: boolean = await this.reviewService.submitReview(this.note, observation);
      if(submitReview){
        this.reviewService.unDisplayPopUp();
        this.popUpServiceService.setBigTitle('تم إرسال التقييم')
        this.popUpServiceService.setTitle('شكراً لكم');
        this.popUpServiceService.setMsg('لقد تم إرسال تقيمكم بنجاح');
        this.popUpServiceService.displayPopUp();
      }else{
        this.popUpServiceService.setBigTitle('خطأ أثناء التقييم')
        this.popUpServiceService.setTitle('خطأ في الإتصال');
        this.popUpServiceService.setMsg('لا يمكن إرسال تقييمك');
        this.popUpServiceService.displayPopUp();
      }
    }
  }

}
