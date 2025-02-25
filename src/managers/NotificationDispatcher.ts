import { HeliosEvent } from "../events/base/HeliosEvent";
import EventDispatcher from "./EventDispatcher";

class NotificationDispatcher {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
		this.subscribe();
	}

	subscribe() {
		this.eventDispatcher.on("user_registered", this.handleGameEvent);
		this.eventDispatcher.on("order_completed", this.handleSocialEvent);
	}

	handleGameEvent(event: HeliosEvent) {
		console.log("Game event received:", event);
	}

	handleSocialEvent(event: HeliosEvent) {
		console.log("Social event received:", event);
	}
}

export default NotificationDispatcher;
