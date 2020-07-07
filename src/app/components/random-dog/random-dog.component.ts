import {Component, OnDestroy, OnInit} from '@angular/core';
import {RandomDogService} from '../../services/random-dog.service';
import {RandomDog} from '../../classes/random-dog';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
	selector: 'app-random-dog',
	templateUrl: './random-dog.component.html',
	styleUrls: ['./random-dog.component.scss']
})


export class RandomDogComponent implements OnDestroy, OnInit {

	private randomDogSubscription: Subscription;

	public randomDog: RandomDog = new RandomDog();
	public isVideo = false;
	public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private randomDogService: RandomDogService) {

	}

	ngOnInit() {
		this.getRandomDogFromService();
	}

	ngOnDestroy() {
		this.randomDogSubscription.unsubscribe();
	}

	onRandomDogBtnClicked = () => {
		this.getRandomDogFromService();
	}

	getRandomDogFromService = () => {
		const vm = this;

		this.isLoading.next(true);

		// (event) => {
		// 	// Don't change value after finished upload
		// 	if (event.loaded !== undefined) {
		// 		// Convert progress to percentage and integer
		// 		this.progress = Math.trunc(event.loaded / (event.total || event.loaded) * 100);
		//
		// 		this.progress.valueOf();
		// 	}
		// 	// Log upload progress
		// 	console.log(this.progress);

		this.randomDogSubscription = this.randomDogService.getRandomDogImage()
			.subscribe(
				{
					next(data) {
						vm.loadRandomDog(data);
					},
					error(error) {
						console.error(error);
					},
					complete() {
						vm.isLoading.next(false);
					}
				}
			);
	}

	loadRandomDog = (randomDog: any) => {
		this.randomDog.setFileSizeBytes(randomDog.fileSizeBytes);
		this.randomDog.setUrl(randomDog.url);

		console.log(this.randomDog);

		this.isVideo = this.randomDog.getUrl().indexOf('.mp4') > -1;
	}

}
