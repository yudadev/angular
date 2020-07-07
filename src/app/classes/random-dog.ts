export class RandomDog {

	private fileSizeBytes: number;
	private url: string;

	constructor() {
	}

	public getFileSizeBytes(): number {
		return this.fileSizeBytes;
	}

	public setFileSizeBytes(value) {
		this.fileSizeBytes = value;
	}

	public getUrl(): string {
		return this.url;
	}

	public setUrl(value) {
		this.url = value;
	}
}
