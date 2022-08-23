import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from './interface/user.interface';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmit: boolean = false;
  hide = true;

  loginForm!: FormGroup;
  constructor(private authService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.goToHome();
    } else {
      alert('login belum valid');
    }
  }

  goToHome() {
    let user: UserData = new UserData(
      this.username?.value,
      this.password?.value
    );
    this.authService.encryptDataUser(user);
    this.router.navigate(['herzfr']);
  }
}
