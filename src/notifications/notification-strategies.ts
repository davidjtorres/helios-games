import { GameEventNameEnum, SocialEventNameEnum } from "../common/enums";
import { NotificationTypeEnum } from "../common/enums";
import { GameEvent } from "../events/game/base/game-event";
import { SocialEvent } from "../events/social/base/social-event";
import { BaseEvent } from "../events/base/base-event";
import { UserNotificationPreferences } from "../services/store-manager";
import BaseNotification from "./base-notification";

export interface NotificationStrategy {
	createNotification(
		event: any,
		notificationType: NotificationTypeEnum
	): BaseNotification;
	shouldProcess(event: any, preferences: UserNotificationPreferences): boolean;
}

export class PlayerAcquireItemStrategy implements NotificationStrategy {
	createNotification(
		event: GameEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} acquired item ${event.eventPayload.itemId}`,
			playerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: BaseEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerAcquireItem &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class PlayerLevelUpStrategy implements NotificationStrategy {
	createNotification(
		event: GameEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} reached level ${event.eventPayload.level}`,
			playerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerLevelUp &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class PlayerCompleteQuestStrategy implements NotificationStrategy {
	createNotification(
		event: GameEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		const playerId = event.eventPayload.playerId;
		return new BaseNotification(
			`Player ${playerId} completed quest ${event.eventPayload.questId}`,
			playerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerCompleteQuest &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class PlayerCompleteAchievementStrategy implements NotificationStrategy {
	createNotification(
		event: GameEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		return new BaseNotification(
			`Player ${event.eventPayload.playerId} achieved ${event.eventPayload.achievementId}`,
			event.eventPayload.playerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: GameEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === GameEventNameEnum.PlayerCompleteAchievement &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class FriendRequestStrategy implements NotificationStrategy {
	createNotification(
		event: SocialEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		return new BaseNotification(
			`Received a friend request from Player ${event.eventPayload.playerId}`,
			event.eventPayload.targetPlayerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: SocialEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === SocialEventNameEnum.FriendRequest &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class FriendRequestAcceptedStrategy implements NotificationStrategy {
	createNotification(
		event: SocialEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		return new BaseNotification(
			`Player ${event.eventPayload.targetPlayerId} accepted your friend request`,
			event.eventPayload.targetPlayerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: SocialEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === SocialEventNameEnum.FriendRequestAccepted &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}

export class FollowUserStrategy implements NotificationStrategy {
	createNotification(
		event: SocialEvent,
		notificationType: NotificationTypeEnum
	): BaseNotification {
		return new BaseNotification(
			`Player ${event.eventPayload.playerId} started following you`,
			event.eventPayload.targetPlayerId,
			notificationType,
			1
		);
	}

	shouldProcess(
		event: SocialEvent,
		preferences: UserNotificationPreferences
	): boolean {
		return (
			event.getEventName() === SocialEventNameEnum.FollowUser &&
			(preferences.channels.inApp ||
				preferences.channels.email ||
				preferences.channels.push)
		);
	}
}
