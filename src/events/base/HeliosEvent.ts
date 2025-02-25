export class HeliosEvent {
	constructor(private eventName: string) {
		this.eventName = eventName;
	}

	getEventName(): string {
		throw new Error("getMessage() must be implemented");
	}

	getMessage(): string {
		throw new Error("getName() must be implemented");
	}
}
