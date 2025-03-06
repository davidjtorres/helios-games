import GameEngine from "./src/engines/game-engine";
import SocialEngine from "./src/engines/social-engine";
import EventDispatcher from "./src/event-dispatcher/event-dispatcher";
import InAppNotificationDispatcher from "./src/notifications/in-app-notification-dispatcher";
import NotificationRouter from "./src/notifications/notification-router";
import StoreManager from "./src/services/store-manager";

function main() {
	const eventDispatcher = new EventDispatcher();
	const gameEngine = new GameEngine(eventDispatcher);
	const socialEngine = new SocialEngine(eventDispatcher);
	const storeManager = new StoreManager();
	const notificationRouter = new NotificationRouter(
		eventDispatcher,
		storeManager
	);
	const inAppNotificationDispatcher = new InAppNotificationDispatcher(
		eventDispatcher
	);
	gameEngine.playerAcquireItem("1", "1");
	gameEngine.playerLevelUp("1", 1);
	socialEngine.sendFriendRequest("1", "2", "1");
	socialEngine.acceptFriendRequest("2", "1", "1");
	socialEngine.followUser("1", "2", "1");
}

main();
