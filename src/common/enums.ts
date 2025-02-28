export enum GameEventNameEnum {
	PlayerLevelUp = "playerLevelUp",
	PlayerAcquireItem = "playerAcquireItem",
	PlayerCompleteQuest = "playerCompleteQuest",
	PlayerCompleteAchievement = "playerCompleteAchievement",
	PlayerVsPlayer = "playerVsPlayer",
}

export enum NotificationTypeEnum {
	Email = "email",
	Push = "push",
	Web = "web",
}

export enum NotificationDispatcherEnum {
	InApp = "in-app-notification-dispatcher",
	Email = "email-notification-dispatcher",
	Push = "push-notification-dispatcher",
}
