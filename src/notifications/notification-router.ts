import {
	NotificationDispatcherEnum,
} from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";
import StoreManager, {
} from "../services/store-manager";
import SocialEvent from "../events/social/base/social-event";
import { NotificationStrategy } from "./notification-strategies";
import { PlayerLevelUpStrategy } from "./notification-strategies";
import { PlayerAcquireItemStrategy } from "./notification-strategies";
import { PlayerCompleteQuestStrategy } from "./notification-strategies";
import { PlayerCompleteAchievementStrategy } from "./notification-strategies";

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
				new PlayerCompleteQuestStrategy(),
				new PlayerCompleteAchievementStrategy(),
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

