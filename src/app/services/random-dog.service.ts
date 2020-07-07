import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
	providedIn: 'root'
})
export class RandomDogService {

	constructor(
		private http: HttpClient
	) {
	}

	// Create
	getRandomDogImage(): Observable<any> {
		const API_URL = 'https://random.dog/woof.json';
		return this.http.get<any>(API_URL)
			.pipe(
				catchError(this.handleError<any>('getRandomDogImage', []))
			);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
