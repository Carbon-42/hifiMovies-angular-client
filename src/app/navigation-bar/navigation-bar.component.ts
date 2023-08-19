import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  // standalone: true,
  // imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
  
export class NavigationBarComponent {

  constructor(
    private router: Router
  ) { }
  
  /**
   * navigates to the main page with all movies
   */
  getHome(): void {
    this.router.navigate(['movies'])
  }

  /**
   * navigates to the user profile page
   */
  getProfile(): void {
    this.router.navigate(['user'])
  }

  /**
   * navigates to the welcome page and logs out user
   */
  logOut(): void {
    this.router.navigate(['welcome'])
  }
}


