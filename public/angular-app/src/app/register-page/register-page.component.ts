import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  user: User = {} as User;

  newUsername = "";
  newName = "";
  newPassword = "";
  newPasswordRepeat = "";

  errorMessage = "";
  success = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("jwt-token")) {
      this.router.navigate(["/"]);
    }
  }

  public registerUser(): void {
    if (this.newUsername == "" || this.newName == "" ||
      this.newPassword == "") {
      this.errorMessage = "All Fields are required!!!";

    } else {
      if (this.newPassword !== this.newPasswordRepeat) {
        this.errorMessage = "Please make sure the passwords match";
      } else {
        const user = {
          username: this.newUsername,
          name: this.newUsername,
          password: this.newPassword,

        }
        console.log(user);
        this.userService.registerUser(user)
          .then(() => this.success = "Registration successfull!!!");
      }

    }

  }
}

export class User {
  _id!: string;
  usename!: string;
  name!: string;
  password!: string;
}

