import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from 'src/app/models/login-view-model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  isShowLogOutButton: boolean = false;
  isLogin: boolean = false;
  user!: LoginViewModel;

  constructor(private userService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userService.user.subscribe(
      user => {
        console.log("this is user", user)
        this.isLogin = (!!user && user.UserName !== '') ;
        this.user = user;
      }
    )

  }

  showLogOutButton() {
    this.isShowLogOutButton = !this.isShowLogOutButton;
  }

  logOut() {
    this.userService.Logout();
    this.router.navigateByUrl("/");
  }
}
