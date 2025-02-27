import NotificationRouter from "./notification-router";
import { NotificationDispatcherEnum } from "../common/enums";
import { GameEvent } from "../events/game/base/game-event";
import BaseNotification from "./base-notification";
import { UserNotificationPreferences } from "../services/store-manager";
describe("NotificationRouter", () => {
	let mockEventDispatcher: any;
	let mockStoreManager: any;
	let notificationRouter: NotificationRouter;

	beforeEach(() => {
		mockEventDispatcher = {
			on: jest.fn(),
			dispatchEvent: jest.fn(),
		};

		mockStoreManager = {
			getItem: jest.fn(),
		};

		notificationRouter = new NotificationRouter(
			mockEventDispatcher,
			mockStoreManager
		);
	});

	test("should subscribe to GameEvent on instantiation", () => {
		expect(mockEventDispatcher.on).toHaveBeenCalledWith(
			GameEvent.EVENT_TYPE,
			notificationRouter.handleEvent
		);
	});

	test("getUserNotificationPreferences should call storeManager.getItem with the correct key", () => {
		const userId = "user123";
		notificationRouter.getUserNotificationPreferences(userId);
		expect(mockStoreManager.getItem).toHaveBeenCalledWith(
			`user_notification_preferences_${userId}`
		);
	});

	test("createNotification should return an instance of BaseNotification with proper properties", () => {
		const event = {
			payload: { message: "test message" },
			playerId: "user123",
			notificationType: "info",
			priority: "high",
		};

		const notification = notificationRouter.createNotification(event);
		expect(notification).toBeInstanceOf(BaseNotification);
		expect(notification).toMatchObject({
			payload: event.payload,
			playerId: event.playerId,
			notificationType: event.notificationType,
			priority: event.priority,
		});
	});

	describe("handleEvent", () => {
		const sampleEvent = {
			playerId: "user123",
			payload: { message: "event payload" },
			notificationType: "alert",
			priority: "medium",
		};

		test("should dispatch inApp notifications when user preferences for both social and game events are enabled", () => {
			// Set up a fake preference where both socialEvent and gameEvent are enabled,
			// and the inApp channel is enabled.
			const userPrefs = {
				events: {
					socialEvent: true,
					gameEvent: true,
				},
				channels: {
					email: false,
					inApp: true,
					push: false,
					telegram: false,
				},
			};

			// Mock getUserNotificationPreferences to return our fake preferences.
			jest
				.spyOn(notificationRouter, "getUserNotificationPreferences")
				.mockReturnValue(userPrefs);

			// Call handleEvent. Note that handleEvent is not bound by default,
			// so if needed you might bind it or call it with the proper context.
			notificationRouter.handleEvent(sampleEvent);

			// Since both socialEventsHandler and gameEventsHandler are invoked,
			// we expect two inApp dispatch calls.
			expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledTimes(2);
			expect(mockEventDispatcher.dispatchEvent).toHaveBeenCalledWith(
				NotificationDispatcherEnum.InApp,
				sampleEvent
			);
		});

		test("should not dispatch notifications if user preferences disable both event types", () => {
			const userPrefs: UserNotificationPreferences = {
				events: {
					socialEvent: false,
					gameEvent: false,
				},
				channels: {
					email: false,
					inApp: false,
					push: false,
					telegram: false,
				},
			};

			jest
				.spyOn(notificationRouter, "getUserNotificationPreferences")
				.mockReturnValue(userPrefs);

			notificationRouter.handleEvent(sampleEvent);

			expect(mockEventDispatcher.dispatchEvent).not.toHaveBeenCalled();
		});
	});
});
