import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserRegisterService} from '../user-register/user-register.service';
import {ApplicationUser} from '../models/application-user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from './settings/must-match.validator';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  @ViewChild('panel') panel;
  @ViewChild('panel2') panel2;

  private usersService: UserRegisterService;
  userRoles: String[];


  constructor(private userService: UserRegisterService,
              private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {
    this.usersService = userService;
  }

  ngOnInit() {

    this.route.url.subscribe(x => {
        if (x.toString() === 'userpanel') {
          this.renderer.removeClass(this.panel2.nativeElement, 'col-lg-8');
          this.renderer.addClass(this.panel.nativeElement, 'mx-auto');
        }
      }
    );
  }

  onSettings() {
    this.renderer.removeClass(this.panel.nativeElement, 'mx-auto');
    this.renderer.addClass(this.panel2.nativeElement, 'col-lg-8');
    this.router.navigate(['settings'], {relativeTo: this.route});
  }

  onScoreBoard() {
    this.renderer.removeClass(this.panel.nativeElement, 'mx-auto');
    this.renderer.addClass(this.panel2.nativeElement, 'col-lg-8');
    this.router.navigate(['scoreboard'], {relativeTo: this.route});
  }

  isUserHavePointsToAdd(): boolean {
    let user: ApplicationUser;
    user = this.userService.getUserObjet();

    return user.experience.pointsToAdd > 0;
  }

}
