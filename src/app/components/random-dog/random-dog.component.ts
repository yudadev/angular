import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RandomDogService} from '../../services/random-dog.service';
import {RandomDog} from '../../classes/random-dog';
import {BehaviorSubject, Subscription} from 'rxjs';
// import {HttpEventType} from '@angular/common/http';

@Component({
	selector: 'app-random-dog',
	templateUrl: './random-dog.component.html',
	styleUrls: ['./random-dog.component.scss']
})


export class RandomDogComponent implements OnDestroy, OnInit {

	private randomDogJsonSubscription: Subscription;
	// private randomDogMediaSubscription: Subscription;

	public currentRandomDog: RandomDog = new RandomDog();
	public randomDogMediaBlob;
	public percentDone = 0;
	public isError = false;
	public isVideo = false;
	public isLoadingJson: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public isLoadingMedia: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public randomDogList: RandomDog[] = [];
	public currentPosition = 0;
	public maxRandomDogListLength = 10;

	@ViewChild('videoPlayer') videoPlayer: ElementRef;

	constructor(
		private randomDogService: RandomDogService,
		private renderer: Renderer2
	) {

	}

	ngOnInit() {
		this.getRandomDogFromService();
	}

	ngOnDestroy() {
		this.randomDogJsonSubscription.unsubscribe();
		// this.randomDogMediaSubscription.unsubscribe();
	}

	onRandomDogBtnClicked = () => {
		this.getRandomDogFromService();
	}

	getRandomDogFromService = () => {
		const vm = this;

		this.isLoadingJson.next(true);
		this.isLoadingMedia.next(true);

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

		this.randomDogJsonSubscription = this.randomDogService.getRandomDogMediaJson()
			.subscribe(
				{
					next(data) {
						vm.loadRandomDog(data);

						// Does not work due to CORS
						// Purpose: Show accurate loading progress
						// vm.randomDogMediaSubscription = vm.randomDogService.getRandomDogMedia( vm.currentRandomDog.getUrl() )
						// 	.subscribe(
						// 		result => {
						// 			if (result.type === HttpEventType.DownloadProgress) {
						// 				vm.percentDone = Math.round(100 * result.loaded / result.total);
						// 				console.log(vm.percentDone);
						// 			}
						// 			if (result.type === HttpEventType.Response) {
						// 				vm.isLoadingJson.next(false);
						// 				vm.randomDogMediaBlob = result.body;
						// 			}
						// 		}
						// 	);
					},
					error(error) {
						console.error(error);
					},
					complete() {
						vm.isLoadingJson.next(false);
					}
				}
			);
	}

	// Process data retrieved from JSON subscription
	loadRandomDog = (randomDog: any) => {
		const newRandomDog: RandomDog = new RandomDog();
		newRandomDog.setFileSizeBytes(randomDog.fileSizeBytes);
		newRandomDog.setUrl(randomDog.url);
		this.randomDogList.push(newRandomDog);

		// Remove the first item from the list when the list exceeds max length
		if (this.randomDogList.length > this.maxRandomDogListLength) {
			this.randomDogList.shift();
		}

		console.log(this.randomDogList);

		// this.currentRandomDog.setFileSizeBytes(randomDog.fileSizeBytes);
		// this.currentRandomDog.setUrl(randomDog.url);

		this.showRandomDog();
	}

	showRandomDog() {
		this.isError = false;

		this.currentRandomDog.setFileSizeBytes(this.randomDogList[this.currentPosition].getFileSizeBytes());
		this.currentRandomDog.setUrl(this.randomDogList[this.currentPosition].getUrl());

		console.log(this.currentRandomDog);

		this.isVideo = this.currentRandomDog.getUrl().indexOf('.mp4') > -1 ||
			this.currentRandomDog.getUrl().indexOf('.webm') > -1;

		if (this.isVideo) {
			// console.log(this.videoPlayer);
			// const video: HTMLVideoElement = this.videoPlayer.nativeElement;
			// console.log(video);
			this.isLoadingMedia.next(false);
		}

	}

	// Fires when media is fully loaded
	onMediaLoad(event) {
		// if (this.isVideo) {
		// 	const video: HTMLVideoElement = this.videoPlayer.nativeElement;
		// 	console.log(video);
		// }
		this.isLoadingMedia.next(false);
		// console.log('onMediaLoad, isVideo: ' + this.isVideo);
		// console.log(event);
	}

	// Fires if media can't be loaded
	onMediaError(event, mediaType: string) {
		this.isError = true;

		this.isLoadingMedia.next(false);
		// console.log('onMediaError, isVideo: ' + this.isVideo);
		// console.log(event);
		// console.log(this.currentRandomDog);
	}

	onSwipeLeft(event) {
		this.showNextDog();
	}

	onSwipeRight(event) {
		this.showPreviousDog();
	}

	showPreviousDog() {
		if (this.currentPosition > 0) {
			this.currentPosition--;

			this.showRandomDog();
		}
	}

	showNextDog() {
		if (this.currentPosition < this.maxRandomDogListLength - 1) {
			this.currentPosition++;

			if (this.randomDogList[this.currentPosition] === undefined) {
				this.getRandomDogFromService();
			} else {
				this.showRandomDog();
			}

		} else {
			this.getRandomDogFromService();
		}
	}

}
