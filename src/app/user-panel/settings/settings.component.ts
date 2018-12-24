import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ) { }


  ngOnInit() {
  }

  onClose() {
    this.router.navigate(['/userpanel']);
  }

}
