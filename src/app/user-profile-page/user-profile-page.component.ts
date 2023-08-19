import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent {
  user: any = {};
  favMovies: any = [{}];
  
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  
  /**
   * loads user information from localstorage
   * fetches all movies from api and filters them for users favorites
   */
  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favMovies = resp.filter((m: {_id: any}) => this.user.favoriteMovies.indexOf(m._id) >= 0)
    })
    console.log('favMovies', this.favMovies)
      // return console.log(this.user)
  }

  /**
   * opens dialog to edit user information
   */
  openeditUserDialog(): void {
    this.dialog.open(UserEditDialogComponent, {
      // Assigning the dialog a width
          width: '280px'
          });      
  }
  
}


