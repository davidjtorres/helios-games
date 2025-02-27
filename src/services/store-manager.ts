export interface UserNotificationPreferences {
	events: {
		gameEvent: boolean;
		socialEvent: boolean;
	};
	channels: {
		inApp: boolean;
		email: boolean;
		push: boolean;
		telegram: boolean;
	};
}

class StoreManager {
	private store: Record<string, UserNotificationPreferences>;

	constructor() {
		this.store = {
			user_notification_preferences_1: {
				events: {
					gameEvent: true,
					socialEvent: true,
				},
				channels: {
					inApp: true,
					email: false,
					push: true,
					telegram: true,
				},
			},
		};
	}

	addItem(key: string, value: any): void {
		this.store[key] = value;
	}

	getItem(key: string): UserNotificationPreferences | undefined {
		return this.store[key];
	}

	removeItem(key: string): boolean {
		return delete this.store[key];
	}

	clearStore(): void {
		this.store = {};
	}

	getAllItems(): Record<string, UserNotificationPreferences> {
		return this.store;
	}
}

export default StoreManager;
