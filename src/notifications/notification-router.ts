import {
	GameEventNameEnum,
	NotificationDispatcherEnum,
	NotificationTypeEnum,
} from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";
import StoreManager, {
	UserNotificationPreferences,
} from "../services/store-manager";
import BaseNotification from "./base-notification";
import SocialEvent from "../events/social/base/social-event";

/**
 * @description This class is responsible for routing notifications to the appropriate notification dispatcher
 */

class NotificationRouter {
	private strategies: NotificationStrategy[] = [];

	constructor(
		private eventDispatcher: EventDispatcher,
		private storeManager: StoreManager
	) {
		this.eventDispatcher = eventDispatcher;
		this.storeManager = storeManager;
		this.initializeStrategies();
		this.subscribe();
	}

	private initializeStrategies() {
		this.strategies.push(
			new PlayerAcquireItemStrategy(),
			new PlayerLevelUpStrategy(),
			new SocialEventStrategy()
		);
	}

	private getUserNotificationPreferences(userId: string) {
		return this.storeManager.getItem(`user_notification_preferences_${userId}`);
	}

	private subscribe() {
		this.eventDispatcher.on(GameEvent.EVENT_TYPE, (event) =>
			this.handleEvent(event)
		);
	}

	private handleEvent(event: GameEvent | SocialEvent) {
		const playerId = event.eventPayload.playerId;
		try {
			const userNotificationPreferences =
				this.getUserNotificationPreferences(playerId);

			// Find and apply the appropriate strategy
			for (const strategy of this.strategies) {
				if (strategy.shouldProcess(event, userNotificationPreferences)) {
					const notification = strategy.createNotification(event);
					this.eventDispatcher.dispatchEvent(
						NotificationDispatcherEnum.InApp,
						notification
					);
				}
			}
		} catch (error) {
			console.error("Error handling event", error);
		}
	}
}

export default NotificationRouter;


interface NotificationStrategy {
	createNotification(event: any): BaseNotification;
	shouldProcess(event: any, preferences: UserNotificationPreferences): boolean;
}

class PlayerAcquireItemStrategy implements NotificationStrategy {
	createNotification(event: GameEvent): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} acquired item ${event.eventPayload.itemId}`,
			playerId,
			NotificationTypeEnum.InApp,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerAcquireItem &&
			preferences.channels.inApp
		);
	}
}

class PlayerLevelUpStrategy implements NotificationStrategy {
	createNotification(event: GameEvent): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} reached level ${event.eventPayload.level}`,
			playerId,
			NotificationTypeEnum.InApp,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerLevelUp &&
			preferences.channels.inApp
		);
	}
}


class SocialEventStrategy implements NotificationStrategy {
	createNotification(event: SocialEvent): BaseNotification {
		// Create appropriate notification for social events
		return new BaseNotification(
			event.eventPayload.message,
			event.eventPayload.playerId,
			NotificationTypeEnum.InApp,
			1
		);
	}

	shouldProcess(
		event: SocialEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return preferences.channels.inApp;
	}
}