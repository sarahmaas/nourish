import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  modalActions = new EventEmitter<string|MaterializeAction>();
  carouselActions = new EventEmitter<string|MaterializeAction>();


  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }


  prev(){
      this.carouselActions.emit({action:"carousel",params:['prev']});
  }

  next(){
      this.carouselActions.emit({action:"carousel",params:['next']});
  }

}