import {
	NotificationDispatcherEnum,
	NotificationTypeEnum,
} from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";
import StoreManager from "../services/store-manager";
import { SocialEvent } from "../events/social/base/social-event";
import { NotificationStrategy } from "./notification-strategies";
import { PlayerLevelUpStrategy } from "./notification-strategies";
import { PlayerAcquireItemStrategy } from "./notification-strategies";
import { PlayerCompleteQuestStrategy } from "./notification-strategies";
import { PlayerCompleteAchievementStrategy } from "./notification-strategies";
import { FriendRequestStrategy } from "./notification-strategies";
import { FriendRequestAcceptedStrategy } from "./notification-strategies";
import { FollowUserStrategy } from "./notification-strategies";

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
		try {
			this.strategies.push(
				new PlayerAcquireItemStrategy(),
				new PlayerLevelUpStrategy(),
				new PlayerCompleteQuestStrategy(),
				new PlayerCompleteAchievementStrategy(),
				new FriendRequestStrategy(),
				new FriendRequestAcceptedStrategy(),
				new FollowUserStrategy()
			);
		} catch (error) {
			console.error("Error initializing strategies:", error);
		}
	}

	private getUserNotificationPreferences(userId: string) {
		try {
			return this.storeManager.getItem(`user.notification.preferences.${userId}`);
		} catch (error) {
			console.error("Error retrieving user notification preferences:", error);
			return null;
		}
	}

	private subscribe() {
		try {
			this.eventDispatcher.on(GameEvent.EVENT_TYPE, (event) =>
				this.handleEvent(event)
			);
			this.eventDispatcher.on(SocialEvent.EVENT_TYPE, (event) =>
				this.handleEvent(event)
			);
		} catch (error) {
			console.error("Error subscribing to events:", error);
		}
	}

	private handleEvent(event: GameEvent | SocialEvent) {
		const playerId = event.eventPayload.playerId;
		try {
			const userNotificationPreferences =
				this.getUserNotificationPreferences(playerId);

			for (const strategy of this.strategies) {
				if (strategy.shouldProcess(event, userNotificationPreferences)) {
					// Dispatch to all enabled channels
					if (userNotificationPreferences.channels.inApp) {
						const notification = strategy.createNotification(
							event,
							NotificationTypeEnum.InApp
						);
						this.eventDispatcher.dispatchEvent(
							NotificationDispatcherEnum.InApp,
							notification
						);
					}
					if (userNotificationPreferences.channels.email) {
						const notification = strategy.createNotification(
							event,
							NotificationTypeEnum.Email
						);
						this.eventDispatcher.dispatchEvent(
							NotificationDispatcherEnum.Email,
							notification
						);
					}
					if (userNotificationPreferences.channels.push) {
						const notification = strategy.createNotification(
							event,
							NotificationTypeEnum.Push
						);
						this.eventDispatcher.dispatchEvent(
							NotificationDispatcherEnum.Push,
							notification
						);
					}
				}
			}
		} catch (error) {
			console.error("Error handling event", error);
		}
	}
}

export default NotificationRouter;
