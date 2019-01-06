import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApplicationUser} from '../../models/application-user.model';
import {Expierence} from '../../models/expierence.model';
import {UserRegisterService} from '../../user-register/user-register.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private userService: UserRegisterService) {
  }

  applicationUser: ApplicationUser;
  experience: Expierence;
  experienceTemp: Expierence;

  ngOnInit() {
    this.applicationUser = this.userService.getUserObjet();
    this.getExperienceByUser();
    console.log(this.experienceTemp);
  }


  onClose() {
    this.router.navigate(['/userpanel']);
  }

  getExperienceByUser() {
    this.http.get<Expierence>('http://localhost:8080/api/experience/' + this.applicationUser.id).subscribe(resp => {
      this.experience = resp;
    });

    this.http.get<Expierence>('http://localhost:8080/api/experience/' + this.applicationUser.id).subscribe(resp => {
      this.experienceTemp = resp;
    });
  }

  isNeededToPresentPlusButton(): boolean {
    if (this.experienceTemp !== undefined) {
      return this.experienceTemp.pointsToAdd !== 0;
    }
    return false;
  }

  isNeededToPresentMinusButton(where: string): boolean {
    if (this.experienceTemp !== undefined) {

      if (where === 'attack') {
        return this.experienceTemp.attack > this.experience.attack;
      }
      if (where === 'defence') {
        return this.experienceTemp.defence > this.experience.defence;
      }
      if (where === 'knowledge') {
        return this.experienceTemp.knowledge > this.experience.knowledge;
      }
      if (where === 'speedAttack') {
        return this.experienceTemp.speedAttack > this.experience.speedAttack;
      }
    }

    return false;
  }

  addPoints(where: string): void {
    if (where === 'attack') {
      this.experienceTemp.attack++;
      this.experienceTemp.pointsToAdd--;
    }
    if (where === 'defence') {
      this.experienceTemp.defence++;
      this.experienceTemp.pointsToAdd--;
    }
    if (where === 'knowledge') {
      this.experienceTemp.knowledge++;
      this.experienceTemp.pointsToAdd--;
    }
    if (where === 'speedAttack') {
      this.experienceTemp.speedAttack++;
      this.experienceTemp.pointsToAdd--;
    }
  }

  removePoints(where: string): void {
    if (where === 'attack') {
      this.experienceTemp.attack--;
      this.experienceTemp.pointsToAdd++;
    }
    if (where === 'defence') {
      this.experienceTemp.defence--;
      this.experienceTemp.pointsToAdd++;
    }
    if (where === 'knowledge') {
      this.experienceTemp.knowledge--;
      this.experienceTemp.pointsToAdd++;
    }
    if (where === 'speedAttack') {
      this.experienceTemp.speedAttack--;
      this.experienceTemp.pointsToAdd++;
    }
  }

  saveExperienceToDb() {
    this.http.put<Expierence>('http://localhost:8080/api/experience', this.experienceTemp).subscribe(resp => {
      this.getExperienceByUser();
      this.applicationUser.experience = resp;
      this.userService.updateApplicationUserInLocalStorage(this.applicationUser);
      this.router.navigate(['/userpanel/scoreboard']);
    });
  }

  isNeededToPresentSaveButton(): boolean {
    return this.isNeededToPresentPlusButton() || this.isNeededToPresentMinusButton('attack') || this.isNeededToPresentMinusButton('defence') ||
      this.isNeededToPresentMinusButton('knowledge') || this.isNeededToPresentMinusButton('speedAttack');
  }

}
