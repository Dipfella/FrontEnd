import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private auth: AuthenticationService, private router: Router) {}

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
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err?.error.message);
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
