import { Component, OnInit } from '@angular/core';
import { SignupViewModel } from '../../models/signup-view-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupViewModel: SignupViewModel = new SignupViewModel();
  signupError: string = "";

  constructor( private router: Router, private loginService: LoginService) 
  {
  }

  ngOnInit()
  {
  }

  onSubmitClick(event: any)
  {
    if (!this.signupViewModel.UserName || !this.signupViewModel.Email
        || !this.signupViewModel.ConfirmPassword || !this.signupViewModel.Password)
    {
      this.signupError = "All fields are required";
      return;
    }
    else if (this.signupViewModel.Password!== this.signupViewModel.ConfirmPassword)
    {
      this.signupError = "Password and ConfirmPassword are not matched";
      return;
    }

    console.log(this.signupViewModel);

    this.loginService.SignUp(this.signupViewModel).subscribe(
      (response) =>
      {
        this.router.navigateByUrl("/login");
      },
      (error) =>
      {
        console.log(error);
        this.signupError = "Error when creating new user";
      },
    );
  }
}
