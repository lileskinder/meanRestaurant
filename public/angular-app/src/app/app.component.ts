import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from './register-page/register-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-games';
  user: User = {} as User;

  username = "";
  password = "";
  constructor(private userService: UserService, private router: Router) { }

  public login(): void {
    const user = {
      username: this.username,
      password: this.password,

    }
    console.log(user);
    
    this.userService.loginUser(user)
      .then((res: any) => {localStorage.setItem("jwt-token", res.token)
    ;
    this.router.navigate(["/"]);})
      
  }

  isAuthenticated(){
    return localStorage.getItem("jwt-token");
  }

  logout() {
     localStorage.removeItem("jwt-token");
     this.router.navigate(["/"]);
  }

}