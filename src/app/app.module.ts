import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RandomDogService} from './services/random-dog.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RandomDogComponent} from './components/random-dog/random-dog.component';
import {AppMaterialModule} from './app-material.module';
import {HttpInterceptorService} from './services/http-interceptor.service';

@NgModule({
	declarations: [
		AppComponent,
		RandomDogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppMaterialModule,
		HammerModule
	],
	providers: [
		RandomDogService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
