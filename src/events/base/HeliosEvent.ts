/**
 * @description This is the base class for all events in the system
 */
export class HeliosEvent {
	static readonly EVENT_TYPE: string = "defaultEventType";
	readonly eventType: string;

	constructor(private eventName: string, private eventMessage: string) {
		this.eventName = eventName;
		this.eventMessage = eventMessage;
		this.eventType = HeliosEvent.EVENT_TYPE;
	}

	getEventName(): string {
		throw new Error("getMessage() must be implemented");
	}

	// method to serialize the event
	serialize(): string {
		return JSON.stringify(this);
	}
}
