import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../../models/login-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onLoginClick(event: any) {
    localStorage.removeItem("token");
    this.loginService.Login(this.loginViewModel).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/movies']);
      },
      (error) => {
        console.log(error);
        this.loginError = "Login Error";
      },
    );
  }

}
