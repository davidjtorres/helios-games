import { NotificationDispatcherEnum } from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";

class InAppNotificationDispatcher {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
		this.subscribe();
	}

	subscribe() {
		this.eventDispatcher.on(NotificationDispatcherEnum.InApp, this.handleEvent);
	}

	handleEvent(event: Record<string, any>) {
		console.log("Game event received:", event);
	}

}

export default InAppNotificationDispatcher;
