import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RandomDogService} from './services/random-dog.service';
import {HttpClientModule} from '@angular/common/http';
import {RandomDogComponent} from './components/random-dog/random-dog.component';
import {AppMaterialModule} from './app-material.module';

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
		AppMaterialModule
	],
	providers: [
		RandomDogService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
