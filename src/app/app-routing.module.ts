import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RandomDogComponent} from './components/random-dog/random-dog.component';


const routes: Routes = [
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
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
