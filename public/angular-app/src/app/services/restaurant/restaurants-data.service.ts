import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Restaurant } from 'src/app/restaurants-list/restaurants-list.component';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsDataService {
  private apiBaseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getRestaurants(): Promise<Restaurant[]> {
    const url: string = this.apiBaseUrl + "/restaurants";
    return this.http.get(url).toPromise()
      .then(response => response as Restaurant[])
      .catch(this.handleError);
  }

  public addRestaurant(data: any): Promise<Restaurant> {
    const url: string = this.apiBaseUrl + "/restaurants";
    return this.http.post(url, data).toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  public getRestaurant(resId: string): Promise<Restaurant> {
    const url: string = this.apiBaseUrl + "/restaurants/"+resId;
    return this.http.get(url).toPromise()
      .then(response => response as Restaurant)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("Something went wronge");
    return Promise.reject(error.message || error);
  }
}
