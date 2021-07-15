import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/register-page/register-page.component';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }
  public registerUser(data: any): Promise<User> {
    const url: string = this.apiBaseUrl + "/users";
    return this.http.post(url, data).toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  public loginUser(data: any): Promise<User> {
    const url: string = this.apiBaseUrl + "/users/login";
    return this.http.post(url, data).toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("Register User went wronge");
    return Promise.reject(error.message || error);
  }

}
