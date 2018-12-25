import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from './must-match.validator';
import {UserRegisterService} from '../../user-register/user-register.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  passwordForm: FormGroup;
  emailForm: FormGroup;
  submitted = false;

  passwordChangeResponse: number;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              private userService: UserRegisterService) {
  }


  ngOnInit() {
    this.passwordChangeResponse = null;
    this.passwordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {validator: MustMatch('password', 'newPassword')}
    );

    this.emailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }

  get f() {
    return this.passwordForm.controls;
  }

  onClose() {

    this.router.navigate(['/userpanel']);
  }

  updatePassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService.updatePassword(this.passwordForm.get('oldPassword').value,
      this.passwordForm.get('newPassword').value).subscribe(
      resp => {
        if (resp !== null) {
          this.passwordChangeResponse = 200;
        }
      },
      (err: HttpErrorResponse) => {
        this.passwordChangeResponse = err.status;
      }
    );

    this.passwordForm.reset();
    this.submitted = false;

  }

  updateEmail() {

    console.log(this.emailForm.get('email').value);
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }

    console.log(this.emailForm.get('email').value);

    this.userService.updateEmail(this.emailForm.get('email').value).subscribe(
      resp => {
        if (resp !== null) {
          this.passwordChangeResponse = 200;
        }
      },
      (err: HttpErrorResponse) => {
        this.passwordChangeResponse = err.status;
      }
    );

    this.emailForm.reset();
    this.submitted = false;
  }


}
