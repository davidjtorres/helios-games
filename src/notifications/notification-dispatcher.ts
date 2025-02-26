import { HeliosEvent } from "../events/base/HeliosEvent";
import EventDispatcher from "../event-dispatcher/event-dispatcher";

class NotificationDispatcher {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
		this.subscribe();
	}

	subscribe() {
		this.eventDispatcher.on(HeliosEvent.EVENT_TYPE, this.handleGameEvent);
	}

	handleGameEvent(event: HeliosEvent) {
		console.log("Game event received:", event);
	}

}

export default NotificationDispatcher;
