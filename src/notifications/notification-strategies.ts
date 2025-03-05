import { GameEventNameEnum } from "../common/enums";
import { NotificationTypeEnum } from "../common/enums";
import { GameEvent } from "../events/game/base/game-event";
import { SocialEvent } from "../events/social/base/social-event";
import { UserNotificationPreferences } from "../services/store-manager";
import BaseNotification from "./base-notification";

export interface NotificationStrategy {
	createNotification(event: any): BaseNotification;
	shouldProcess(event: any, preferences: UserNotificationPreferences): boolean;
}

export class PlayerAcquireItemStrategy implements NotificationStrategy {
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

export class PlayerLevelUpStrategy implements NotificationStrategy {
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

export class PlayerCompleteQuestStrategy implements NotificationStrategy {
	createNotification(event: GameEvent): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} completed quest ${event.eventPayload.questId}`,
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
			event.getEventName() === GameEventNameEnum.PlayerCompleteQuest &&
			preferences.channels.inApp
		);
	}
}

export class PlayerCompleteAchievementStrategy implements NotificationStrategy {
	createNotification(event: GameEvent): BaseNotification {
		return new BaseNotification(
			`Player ${event.eventPayload.playerId} achieved${event.eventPayload.achievementId}`,
			event.eventPayload.playerId,
			NotificationTypeEnum.InApp,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return preferences.channels.inApp;
	}
}