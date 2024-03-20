import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { confirmPasswordValidator } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  visible: boolean = true;
  changetype: boolean = true;
  constructor(private auth: AuthenticationService, private router: Router, private toast: NgToastService) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: confirmPasswordValidator }
    );
  }
  signup() {
    if (this.signupForm.valid) {
      this.auth.SignUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 3000,
            position: "topCenter"
          });
          this.router.navigate(['login']);
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
      alert('Required fields');
    }
  }
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
