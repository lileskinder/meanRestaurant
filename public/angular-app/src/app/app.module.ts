import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //New Line added
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OrderPipe } from './order.pipe';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { StarsPipe } from './stars.pipe';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';

import { RestaurantsDataService } from './services/restaurant/restaurants-data.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    OrderPipe,
    RegisterPageComponent,
    ProfilePageComponent,
    StarsPipe,
    RestaurantsListComponent,
    RestaurantPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: WelcomeComponent
      },

      {
        path: "restaurants",
        component: RestaurantsListComponent
      },

      {
        path: "restaurants/:resId",
        component: RestaurantPageComponent
      },

      {
        path: "register",
        component: RegisterPageComponent
      },
      {
        path: "profile",
        component: ProfilePageComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RestaurantsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
