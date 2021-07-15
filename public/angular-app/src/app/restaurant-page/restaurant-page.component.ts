import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Restaurant } from '../restaurants-list/restaurants-list.component';
import { RestaurantsDataService } from '../services/restaurant/restaurants-data.service';


@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {

  restaurant: Restaurant = {} as Restaurant;

  constructor(private restaurantsDataService: RestaurantsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resId: string = this.route.snapshot.params.resId;
    this.getRestaurant(resId);
  }

  private getRestaurant(resId: string): void {
    this.restaurantsDataService.getRestaurant(resId)
      .then((response) => this.RecievedResctaurant(response))
      .catch(this.handleError);
  }


  private RecievedResctaurant(restaurant: Restaurant) {
    console.log("Restaurant Recieved ", restaurant);
    this.restaurant = restaurant;
  }

  private handleError(error: any) {
    console.log("Error ", error);
    
  }

}
