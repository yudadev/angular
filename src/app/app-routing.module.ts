import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RandomDogComponent} from './components/random-dog/random-dog.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'random-dog',
		component: RandomDogComponent
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
