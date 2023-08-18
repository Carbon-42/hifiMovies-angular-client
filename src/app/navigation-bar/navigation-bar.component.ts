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

  getHome(): void {
    this.router.navigate(['movies'])
  }

  getProfile(): void {
    this.router.navigate(['user'])
  }

  logOut(): void {
    this.router.navigate(['welcome'])
  }
}


