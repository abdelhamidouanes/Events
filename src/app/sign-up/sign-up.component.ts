import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onCreateAccount(form: NgForm):void{
    const email = form.value['email']; 
    const password = form.value['password'];
    const nom = form.value['nom']; 
    const prenom = form.value['prenom'];
    const age = form.value['age'];
    const categorie = form.value['categorie'];
    console.log('categorie '+categorie);
  }
}
