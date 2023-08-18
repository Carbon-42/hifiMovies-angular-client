import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://hifi-movie-api.onrender.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the main page 'all movies' endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for a specific movie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for a specific director endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for a specific genre endpoint
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for a specific user endpoint
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Making the api call for adding a 'favorite movie' endpoint
  postFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username;
    user.favoriteMovies.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {},
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for updating a user
  putUserUpdate(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiUrl + 'users/' + `${user.username}`, userDetails,
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Checks Local storage for favorite movies
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.favoriteMovies.includes(movieID);
    }
    return false;
  }

  // Making the api call for removing a 'favorite movie' endpoint
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.username;

    const index = user.favoriteMovies.indexOf(movieID);
    if (index >= 0) {
      user.favoriteMovies.splice(index, 1);
    }

    localStorage.setItem('user', JSON.stringify(user));

    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, 
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for deregistering a user endpoint
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, 
      {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code: ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}