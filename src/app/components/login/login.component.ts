import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  public loginForm!: FormGroup;
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private auth: AuthenticationService, private router: Router, private toast: NgToastService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.Login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 3000
          });
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 3000,
            position: "topCenter"
          });
        },
      });
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Required fields',
        duration: 3000,
        position: "topCenter"
      });
    }
  }
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
