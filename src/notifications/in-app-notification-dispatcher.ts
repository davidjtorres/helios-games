import { NotificationDispatcherEnum } from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import BaseNotification from "./base-notification";

class InAppNotificationDispatcher {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
		this.subscribe();
	}

	private subscribe() {
		this.eventDispatcher.on(
			NotificationDispatcherEnum.InApp,
			this.handleEvent.bind(this)
		);
	}

	private handleEvent(notification: BaseNotification) {
		console.log(
			`Sending in app notification to user ${notification.userId}:: ${notification.payload}`
		);
	}
}

export default InAppNotificationDispatcher;
