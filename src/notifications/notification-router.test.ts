import NotificationRouter from "./notification-router";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import StoreManager from "../services/store-manager";
import {
	GameEventNameEnum,
	NotificationDispatcherEnum,
	NotificationTypeEnum,
	SocialEventNameEnum,
} from "../common/enums";
import BaseNotification from "./base-notification";
import { GameEvent } from "../events/game/base/game-event";
import { SocialEvent } from "../events/social/base/social-event";
describe("NotificationRouter", () => {
	let mockEventDispatcher: Partial<EventDispatcher>;
	let mockStoreManager: Partial<StoreManager>;
	let notificationRouter: NotificationRouter;

	// Default user preferences for testing
	const defaultPrefs = {
		events: { socialEvent: true, gameEvent: true },
		channels: { email: true, inApp: true, push: true },
	};

	beforeEach(() => {
		// mock a real event dispatcher
		mockEventDispatcher = new EventDispatcher();
		// Create a mock store manager with a getItem method
		mockStoreManager = {
			getItem: jest.fn().mockReturnValue(defaultPrefs),
		};

		jest.spyOn(mockEventDispatcher, "dispatchEvent");
		notificationRouter = new NotificationRouter(
			mockEventDispatcher as EventDispatcher,
			mockStoreManager as StoreManager
		);
	});

	test("should create and dispatch a notification for playerLevelUp game event", () => {
		const event = new GameEvent(GameEventNameEnum.PlayerLevelUp, {
			playerId: "1",
			level: 2,
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("1");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe("Player 1 reached level 2");
	});

	test("should create and dispatch a notification for playerAcquireItem game event", () => {
		const event = new GameEvent(GameEventNameEnum.PlayerAcquireItem, {
			playerId: "1",
			itemId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("1");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe("Player 1 acquired item 1");
	});

	test("should create and dispatch a notification for playerCompleteQuest game event", () => {
		const event = new GameEvent(GameEventNameEnum.PlayerCompleteQuest, {
			playerId: "1",
			questId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("1");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe("Player 1 completed quest 1");
	});

	test("should create and dispatch a notification for playerCompleteAchievement game event", () => {
		const event = new GameEvent(GameEventNameEnum.PlayerCompleteAchievement, {
			playerId: "1",
			achievementId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("1");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe("Player 1 achieved 1");
	});

	test("should create and dispatch a notification for friendRequest game event", () => {
		const event = new SocialEvent(SocialEventNameEnum.FriendRequest, {
			playerId: "1",
			targetPlayerId: "2",
			gameId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("2");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe(
			"Received a friend request from Player 1"
		);
	});

	test("should create and dispatch a notification for friendRequestAccepted game event", () => {
		const event = new SocialEvent(SocialEventNameEnum.FriendRequestAccepted, {
			playerId: "1",
			targetPlayerId: "2",
			gameId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("2");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe(
			"Player 2 accepted your friend request"
		);
	});

	test("should create and dispatch a notification for followUser game event", () => {
		const event = new SocialEvent(SocialEventNameEnum.FollowUser, {
			playerId: "1",
			targetPlayerId: "2",
			gameId: "1",
		});

		mockEventDispatcher.dispatchEvent(event.eventType, event);

		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			"user.notification.preferences.1"
		);

		expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
			NotificationDispatcherEnum.InApp,
			expect.any(BaseNotification)
		);

		const dispatchEventMock = mockEventDispatcher.dispatchEvent as jest.Mock;
		const notificationArg = dispatchEventMock.mock.calls.find(
			(call) => call[0] === NotificationDispatcherEnum.InApp
		)?.[1] as BaseNotification;

		expect(notificationArg).toBeDefined();
		expect(notificationArg.userId).toBe("2");
		expect(notificationArg.notificationType).toBe(NotificationTypeEnum.InApp);
		expect(notificationArg.priority).toBe(1);
		expect(notificationArg.payload).toBe(
			"Player 1 started following you"
		);
	});
});
