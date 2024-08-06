import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginViewModel } from '../models/login-view-model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { SignupViewModel } from '../models/signup-view-model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  user = new BehaviorSubject<LoginViewModel>(new LoginViewModel());

  constructor(private httpClient: HttpClient) {
  }

  currentUserName: any = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.post<any>(this.apiUrl + "/user/signin", loginViewModel, { responseType: "json" })
      .pipe(map(user => {
        if (user) {
          console.log("user login ", user);
          let muuser = new LoginViewModel();
          this.currentUserName = user.user.name;
          muuser.UserName = user.user.name;
          muuser.Token = user.user.token;
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("token", user.user.token)
          this.user.next(muuser);
        }

        return user.user;
      }));
  }

  public SignUp(signupViewModel: SignupViewModel): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/user/signup", signupViewModel, { responseType: "json" })
      .pipe(map(user => {
        if (user) {
          this.currentUserName = user.userName;
        }
        return user;
      }));
  }

  public Logout() {
    this.currentUserName = null;
    this.user.next(new LoginViewModel());
    localStorage.removeItem("token");
  }
}
