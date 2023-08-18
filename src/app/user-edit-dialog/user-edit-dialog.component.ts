// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})

export class UserEditDialogComponent {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
      private fetchApiData: FetchApiDataService,
      private dialogRef: MatDialogRef<UserEditDialogComponent>,
      private snackBar: MatSnackBar,
      private router: Router
    ) { }
  
  ngOnInit(): void {
  }
  
  // This is the function responsible for sending the form inputs to the backend
  updateUser(){

      this.fetchApiData.putUserUpdate(this.userData).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result))
        // This will close the modal on success!
         this.dialogRef.close()
         console.log(result);
        this.snackBar.open("Update successfull!", 'OK', {
          duration: 2000
       });
      window.location.reload()
      }, () => {
        this.snackBar.open("Something went wrong, please try again.", 'OK', {
          duration: 2000
        });
      });
    }
}

