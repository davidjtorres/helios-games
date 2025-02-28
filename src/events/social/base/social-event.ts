import EventDispatcher from "../../../event-dispatcher/event-dispatcher";

class SocialEvent {
	static readonly EVENT_TYPE: string = "SocialEvent";
	readonly eventType: string = "SocialEvent";
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}
}

export default SocialEvent;
