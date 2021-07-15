import { Component, OnInit } from '@angular/core';

import { RestaurantsDataService } from '../services/restaurant/restaurants-data.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  title: string = "MEAN Restaurants";
  restaurant: Restaurant = {} as Restaurant;
  newName = "";
  newAddress = "";
  newYear = "";

  errorMessage = "";
  success = "";

  restaurants: Restaurant[] = [];

  constructor(private restaurantsDataService: RestaurantsDataService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(): void {
    this.restaurantsDataService.getRestaurants()
      .then(foundRestaurant => this.restaurants = foundRestaurant);
  }

  public addRestaurant(): void {
    if (this.newName == "" || this.newAddress == "") {
      this.errorMessage = "All Fields are required!!!";
    } else {
      const restaurant = {
        name: this.newName,
        address: this.newAddress,
      }
      console.log(restaurant);
      this.restaurantsDataService.addRestaurant(restaurant).then(() => this.success = " successfully added");
    }
  }

  isAuthenticated(){
    return localStorage.getItem("jwt-token");
  }


}

export class Restaurant {
  _id!: string;
  name!: string;
  address!: string;
}
