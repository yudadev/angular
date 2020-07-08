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

	public randomDog: RandomDog = new RandomDog();
	public randomDogMediaBlob;
	public percentDone = 0;
	public isError = false;
	public isVideo = false;
	public isLoadingJson: BehaviorSubject<boolean> = new BehaviorSubject(false);
	public isLoadingMedia: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
						// vm.randomDogMediaSubscription = vm.randomDogService.getRandomDogMedia( vm.randomDog.getUrl() )
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

	// Fills in RandomDog object
	loadRandomDog = (randomDog: any) => {
		this.isError = false;
		this.randomDog.setFileSizeBytes(randomDog.fileSizeBytes);
		this.randomDog.setUrl(randomDog.url);

		console.log(this.randomDog);

		this.isVideo = this.randomDog.getUrl().indexOf('.mp4') > -1;

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
		// console.log(event);
	}

	// Fires if media can't be loaded
	onMediaError(event, mediaType: string) {
		this.isError = true;

		this.isLoadingMedia.next(false);
		console.log('onMediaError, isVideo: ' + this.isVideo);
		console.log(event);
	}

}
