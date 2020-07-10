import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RandomDogComponent} from './components/random-dog/random-dog.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
	{
		path: 'random-dog',
		component: RandomDogComponent
	},
	{
		path: '',
		component: HomeComponent
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
