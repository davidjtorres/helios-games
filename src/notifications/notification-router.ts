import { NotificationDispatcherEnum } from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";
import StoreManager, {
	UserNotificationPreferences,
} from "../services/store-manager";
import BaseNotification from "./base-notification";
/**
 * @description This class is responsible for routing notifications to the appropriate notification dispatcher
 */
class NotificationRouter {
	constructor(
		private eventDispatcher: EventDispatcher,
		private storeManager: StoreManager
	) {
		this.eventDispatcher = eventDispatcher;
		this.storeManager = storeManager;
		this.subscribe();
	}

	getUserNotificationPreferences(userId: string) {
		return this.storeManager.getItem(`user_notification_preferences_${userId}`);
	}

	subscribe() {
		this.eventDispatcher.on(GameEvent.EVENT_TYPE, this.handleEvent);
	}

	createNotification(event: Record<string, any>) {
		const notification = new BaseNotification(event.payload, event.playerId,
			event.notificationType,
			event.priority
		);
		return notification;
	}

	handleEvent(event: Record<string, any>) {
		const playerId = event.playerId;
		const userNotificationPreferences =
			this.getUserNotificationPreferences(playerId);
		if (userNotificationPreferences.events.socialEvent) {
			this.socialEventsHandler(event, userNotificationPreferences);
		}
		if (userNotificationPreferences.events.gameEvent) {
			this.gameEventsHandler(event, userNotificationPreferences);
		}
	}
	socialEventsHandler(
		message: Record<string, any>,
		userNotificationPreferences: UserNotificationPreferences
	) {
		const playerId = message.playerId;
		if (userNotificationPreferences.channels.email) {
			//Route event to email dispatcher
		}
		if (userNotificationPreferences.channels.inApp) {
			this.eventDispatcher.dispatchEvent(
				NotificationDispatcherEnum.InApp,
				message
			);
		}
	}

	gameEventsHandler(
		message: Record<string, any>,
		userNotificationPreferences: UserNotificationPreferences
	) {
		const playerId = message.playerId;
		if (userNotificationPreferences.channels.email) {
			//Route event to email dispatcher
		}
		if (userNotificationPreferences.channels.inApp) {
			this.eventDispatcher.dispatchEvent(
				NotificationDispatcherEnum.InApp,
				message
			);
		}
	}
}

export default NotificationRouter;
