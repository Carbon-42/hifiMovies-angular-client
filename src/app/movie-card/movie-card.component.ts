// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailDialogComponent } from '../movie-detail-dialog/movie-detail-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService, 
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getUser(): void {
    this.router.navigate(['user'])
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: genre.name,
        content: genre.description,
      }
    })
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: director.name,
        content: director.bio,
      }
    })
  }

  openSynopsisDialog(description: any): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        title: "Description",
        content: description,
      }
    })
  }

  postFavorite(id: any): void {
    this.fetchApiData.postFavoriteMovie(id).subscribe((Response: any) => {
      this.snackbar.open('Added to Favorites', 'OK', {
        duration: 2000
      })
    })
  }

  isFavorite(id: any): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  removeFavorite(id: any): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((Response: any) => {
      this.snackbar.open('Removed from Favorites', 'OK', {
        duration: 2000
      })
    })
  }
}