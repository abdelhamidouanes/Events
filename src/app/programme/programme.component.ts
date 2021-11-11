import { Component, OnInit } from '@angular/core';
import { imgFolder } from '../shared/constantes';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {


  imgFolder = imgFolder;

  constructor() { }

  ngOnInit(): void {
  }

}
