import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor {

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// All HTTP requests are going to go through this method
		// console.log('INTERCEPTOR');
		// console.log(req, next);

		// Simple interceptor, just passes the request along normally
		return next.handle(req);
	}

	constructor() {
	}
}
