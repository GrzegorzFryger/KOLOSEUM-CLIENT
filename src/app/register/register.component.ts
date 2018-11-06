import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Vehicle} from './vehicle.model';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {

  registerService: RegisterService;

  constructor(private service: RegisterService) { }

  ngOnInit() {
    this.registerService = this.service;

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.vechicle.currentValue);
  }







}
