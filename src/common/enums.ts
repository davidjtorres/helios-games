export enum GameEventNameEnum {
	PlayerLevelUp = "playerLevelUp",
	PlayerAcquireItem = "playerAcquireItem",
	PlayerCompleteQuest = "playerCompleteQuest",
	PlayerCompleteAchievement = "playerCompleteAchievement",
}

export enum NotificationTypeEnum {
	Email = "email",
	Push = "push",
	Web = "web",
	InApp = "in-app",
}

export enum NotificationDispatcherEnum {
	InApp = "in-app-notification-dispatcher",
	Email = "email-notification-dispatcher",
	Push = "push-notification-dispatcher",
}

export enum EventTypeEnum {
	Social = "social-event",
	Game = "game-event",
}

export enum SocialEventNameEnum {
	FollowUser = "followUser",
	UnfollowUser = "unfollowUser",
	FriendRequest = "friendRequest",
	FriendRequestAccepted = "friendRequestAccepted",
}
